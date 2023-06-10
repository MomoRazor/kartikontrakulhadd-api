// import mongoose from 'mongoose';
// import { IOrderSvc, OrderSvc } from './order-management';
// import { MONGO_URL, SENDGRID_API_KEY } from '../env';
// import sgMail from '@sendgrid/mail';
// import { MailRepo, OrderRepo } from '../repositories';
// import { CommunicationSvc } from './communication';
// import { fromEmail } from '../config';
import { generateAdminEmail, generateClientEmail } from '../templates';

// let orderManagement: IOrderSvc;

// beforeAll(async () => {
//     // Set up database connection
//     const databaseConnection = await mongoose.createConnection(MONGO_URL);

//     sgMail.setApiKey(SENDGRID_API_KEY);

//     const orderRepo = await OrderRepo(databaseConnection);
//     const emailRepo = await MailRepo(databaseConnection);

//     const communicationSvc = await CommunicationSvc(sgMail, emailRepo, fromEmail);
//     orderManagement = await OrderSvc(orderRepo, communicationSvc);
// });

// test('Get number of boxes', async () => {
//     try {
//         const result = await orderManagement.getNumberOfBoxesSold();

//         console.log(result);
//     } catch (e: any) {
//         console.error(JSON.stringify(e));
//     }
// }, 10000);

test('Generate Emails', async () => {
    try {
        const result1 = generateAdminEmail({
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
        });

        const result2 = generateClientEmail({
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
        });

        console.log(result1);
        console.log(result2);
    } catch (e: any) {
        console.error(JSON.stringify(e));
    }
}, 10000);
