import express from 'express';
import { json } from 'body-parser';
import { bouncer } from './middleware';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { MAILGUN_DOMAIN, MAILGUN_ID, MAILGUN_SERVICE_URL, STOCK_SIZE } from './enviornment';
import { deliveryPrice, emailList, fromEmail, generatePurchaseUnits, pricePerBox } from './config';
import moment from 'moment';
import { addOrder, getNumberOfBoxesSold } from './function';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bouncer);

app.post('/saveOrder', json(), async (req, res) => {
    if (req.body.orderData) {
        const price =
            pricePerBox * req.body.orderData.amount +
            (req.body.orderData.delivery ? deliveryPrice : 0);
        try {
            await addOrder(req.body.orderData, price);
            res.json();
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    } else {
        console.error('Order Information Missing');
        res.status(400).send('Order Information Missing');
    }
});

app.post('/orderEmail', json(), async (req, res) => {
    if (req.body.orderData) {
        const price =
            pricePerBox * req.body.orderData.amount +
            (req.body.orderData.delivery ? deliveryPrice : 0);
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
                        <li>Mobile Number: ${req.body.orderData.mobileNumber}</li>
                        <li>Amount: ${req.body.orderData.amount}</li>
                        <li>${req.body.orderData.delivery ? 'To Be Delivered' : 'For Pickup'}</li>
                        ${
                            req.body.orderData.delivery
                                ? '<li>Full Address: ' +
                                  req.body.orderData.addressLine1 +
                                  ' ' +
                                  req.body.orderData.addressLine2 +
                                  ' ' +
                                  req.body.orderData.localityCode +
                                  '</li>' +
                                  '<li>Special Request: ' +
                                  req.body.orderData.deliveryNote +
                                  '</li>'
                                : ''
                        }
                        <li>Price: €${price.toFixed(2)}</li>
                    </ul>
                    <p>Soo... yeah, get to it!</p>`
            });
            res.json();
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    } else {
        console.error('Order Information Missing');
        res.status(400).send('Order Information Missing');
    }
});

app.post('/clientEmail', json(), async (req, res) => {
    if (req.body.orderData) {
        const price =
            pricePerBox * req.body.orderData.amount +
            (req.body.orderData.delivery ? deliveryPrice : 0);

        try {
            await axios.post(MAILGUN_SERVICE_URL + 'send', {
                mailgunId: MAILGUN_ID,
                mailgunDomain: MAILGUN_DOMAIN,
                from: fromEmail,
                to: req.body.orderData.email,
                subject: 'Karti Kontra Kulħadd Order received!',
                html: `<p>Hi ${req.body.orderData.name} ${req.body.orderData.surname}! </p>
                <p>We'd like to confirm that we have received your order on KartiKontraKulħadd.com! Here are the details:</p>
                <ul>
                    <li>Name: ${req.body.orderData.name}</li>
                    <li>Surname: ${req.body.orderData.surname}</li>
                    <li>Email: ${req.body.orderData.email}</li>
                    <li>Mobile Number: ${req.body.orderData.mobileNumber}</li>
                    <li>Amount: ${req.body.orderData.amount}</li>
                    <li>${req.body.orderData.delivery ? 'To Be Delivered' : 'For Pickup'}</li>
                    ${
                        req.body.orderData.delivery
                            ? '<li>Full Address: ' +
                              req.body.orderData.addressLine1 +
                              ' ' +
                              req.body.orderData.addressLine2 +
                              ' ' +
                              req.body.orderData.localityCode +
                              '</li>' +
                              '<li>Special Request: ' +
                              req.body.orderData.deliveryNote +
                              '</li>'
                            : ''
                    }
                    <li>Price: €${price.toFixed(2)}</li>
                </ul>`
            });
            res.json();
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    } else {
        console.error('Order Information Missing');
        res.status(400).send('Order Information Missing');
    }
});

app.post('/generatePurchaseUnits', json(), async (req, res) => {
    if (req.body.amount) {
        let purchaseUnits: any[] = generatePurchaseUnits(req.body.amount, req.body.delivery);

        res.json({
            purchaseUnits: purchaseUnits
        });
    } else {
        console.error('Amount Missing');
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

app.get('/stockNumber', async (_, res) => {
    try {
        const orderNumber = await getNumberOfBoxesSold();
        const left = parseInt(STOCK_SIZE || '0') - orderNumber;
        res.json({
            inStock: left
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.get('/', (_, res) => {
    res.send('Hello from the KartiKontraKulhadd API Service!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
