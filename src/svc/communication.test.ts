import mongoose from 'mongoose';
import { MONGO_URL, SENDGRID_API_KEY } from '../env';
import sgMail from '@sendgrid/mail';
import { MailRepo } from '../repositories';
import { CommunicationSvc, ICommunicationSvc } from './communication';
import { fromEmail, fromName } from '../config';
import { generateClientEmail } from '../templates';
import { DateTime } from 'luxon';

let communicationSvc: ICommunicationSvc;

beforeAll(async () => {
    // Set up database connection
    const databaseConnection = await mongoose.createConnection(MONGO_URL);

    sgMail.setApiKey(SENDGRID_API_KEY);

    const emailRepo = await MailRepo(databaseConnection);

    communicationSvc = await CommunicationSvc(sgMail, emailRepo, fromEmail);
});

test('Test Client Email Sending', async () => {
    try {
        const order = {
            addressLine1: 'line1',
            addressLine2: 'line2',
            amount: 1,
            delivery: false,
            deliveryNote: 'No Delivery Note',
            email: 'maurovic.cachia@gmail.com',
            locality: 'Siggiewi',
            mobileNumber: '787676565',
            name: 'Mauro',
            postCode: 'SGW1231',
            price: 45,
            surname: 'Cachia'
        };
        await communicationSvc.sendEmail({
            from: `${fromName} <${fromEmail}>`,
            html: generateClientEmail(order),
            status: 'Pending',
            subject: `KKK Order ${DateTime.now().toFormat('yyyy/MM/dd hh:mm')}`,
            to: [order.email]
        });
    } catch (e: any) {
        console.error(JSON.stringify(e));
    }
}, 10000);

// test('Test Admin email Sending', async () => {
//     try {
//         const order = {
//             addressLine1: 'line1',
//             addressLine2: 'line2',
//             amount: 1,
//             delivery: false,
//             deliveryNote: 'No Delivery Note',
//             email: 'maurovic.cachia@gmail.com',
//             locality: 'Siggiewi',
//             mobileNumber: '787676565',
//             name: 'Mauro',
//             postCode: 'SGW1231',
//             price: 45,
//             surname: 'Cachia'
//         };
//         await communicationSvc.sendEmail({
//             from: `${fromName} <${fromEmail}>`,
//             html: generateAdminEmail(order),
//             status: 'Pending',
//             subject: `KKK Order ${DateTime.now().toFormat(
// 'yyyy/MM/dd hh:mm'
// )}`,
//             to: ADMIN_EMAILS
//         });
//     } catch (e: any) {
//         console.error(JSON.stringify(e));
//     }
// }, 10000);
