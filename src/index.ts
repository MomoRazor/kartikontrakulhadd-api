import express from 'express';
import { bouncer } from './middleware';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { MAILGUN_DOMAIN, MAILGUN_ID, MAILGUN_SERVICE_URL } from './enviornment';
import { deliveryPrice, emailList, fromEmail, pricePerBox } from './config';
import moment from 'moment';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bouncer);

app.post('/orderEmail', async (req, res) => {
    if (req.body.orderData) {
        try {
            await axios.post(MAILGUN_SERVICE_URL + 'send', {
                mailgunId: MAILGUN_ID,
                mailgunDomain: MAILGUN_DOMAIN,
                from: fromEmail,
                to: emailList,
                subject: 'KKK Order ' + moment().format('YYYY-MM-DD HH:mm'),
                html: `<p>Hi! </p>
                    <p>A new order has just been submitted on KartiKontraKulħadd.com! Here are the details:</p>
                    <ul>
                        <li>Name: ${req.body.orderData.name}</li>
                        <li>Surname: ${req.body.orderData.surname}</li>
                        <li>Email: ${req.body.orderData.email}</li>
                        <li>Amount: ${req.body.orderData.amount}</li>
                        <li>Delivery: ${req.body.orderData.delivery ? 'Yes' : 'No'}</li>
                        ${
                            req.body.orderData.delivery
                                ? '<li>Full Address: ' +
                                  req.body.orderData.addressLine1 +
                                  ' ' +
                                  req.body.orderData.addressLine2 +
                                  ' ' +
                                  req.body.orderData.localityCode +
                                  '</li>'
                                : ''
                        }
                        <li>Price: €${req.body.orderData.price.toFixed(2)}</li>
                    </ul>
                    <p>Soo... yeah, get to it!</p>`
            });
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send('Order Information Missing');
    }
});

app.post('/clientEmail', async (req, res) => {
    if (req.body.orderData) {
        try {
            await axios.post(MAILGUN_SERVICE_URL + 'send', {
                mailgunId: MAILGUN_ID,
                mailgunDomain: MAILGUN_DOMAIN,
                from: fromEmail,
                to: emailList,
                subject: 'Karti Kontra Kulħadd Order received!',
                html: `<p>Hi ${req.body.orderData.name} ${req.body.orderData.surname}! </p>
                <p>We'd like to confirm that we have received your order on KartiKontraKulħadd.com! Here are the details:</p>
                <ul>
                    <li>Name: ${req.body.orderData.name}</li>
                    <li>Surname: ${req.body.orderData.surname}</li>
                    <li>Email: ${req.body.orderData.email}</li>
                    <li>Amount: ${req.body.orderData.amount}</li>
                    <li>Delivery: ${req.body.orderData.delivery ? 'Yes' : 'No'}</li>
                    ${
                        req.body.orderData.delivery
                            ? '<li>Full Address: ' +
                              req.body.orderData.addressLine1 +
                              ' ' +
                              req.body.orderData.addressLine2 +
                              ' ' +
                              req.body.orderData.localityCode +
                              '</li>'
                            : ''
                    }
                    <li>Price: €${req.body.orderData.price.toFixed(2)}</li>
                </ul>
                <p>We will be in touch with you soon to coordinate your ${
                    req.body.orderData.delivery ? 'delivery' : 'pickup'
                }!</p>`
            });
        } catch (e) {
            res.status(500).send(e);
        }
    } else {
        res.status(400).send('Order Information Missing');
    }
});

app.post('/generatePurchaseUnits', async (req, res) => {
    if (req.body.amount) {
        let purchaseUnits: any[] = [];

        for (let i = 0; i < req.body.amount; i++) {
            purchaseUnits.push({
                reference_id: 'KKKBOX-' + i,
                description: 'A Box of Karti Kontra Kulħadd',
                amount: {
                    currency_code: 'EUR',
                    value: pricePerBox.toFixed(2)
                }
            });
        }

        if (req.body.delivery) {
            purchaseUnits.push({
                reference_id: 'delivery',
                description: 'Delivery Service',
                amount: {
                    currency_code: 'EUR',
                    value: deliveryPrice.toFixed(2)
                }
            });
        }

        res.json({
            purchaseUnits: purchaseUnits
        });
    } else {
        res.status(400).send('Amount Missing');
    }
});

app.get('/getDeliveryPrice', async (_, res) => {
    res.json({
        deliveryPrice: deliveryPrice
    });
});

app.get('/getPricePerBox', async (_, res) => {
    res.json({
        pricePerBox: pricePerBox
    });
});

app.get('/', (_, res) => {
    res.send('Hello from the KartiKontraKulhadd API Service!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
