import express, { Express, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { BREVO_API_KEY, MONGO_URL } from './env';
import { fromEmail } from './config';
import mongoose from 'mongoose';
import { MailRepo, OrderRepo } from './repositories';
import { AccessSvc, CommunicationSvc, OrderSvc } from './svc';
import { AccessRouter, OrderRouter } from './routers';
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

const main = async () => {
    const databaseConnection = mongoose.createConnection(MONGO_URL);

    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

    const orderRepo = await OrderRepo(databaseConnection);
    const emailRepo = await MailRepo(databaseConnection);

    const app: Express = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(json({ limit: '4mb' }));

    const accessSvc = AccessSvc();
    const communicationSvc = CommunicationSvc(apiInstance, emailRepo, fromEmail);
    const orderSvc = OrderSvc(orderRepo, communicationSvc);

    const accessRouter = AccessRouter(accessSvc);
    const orderRouter = OrderRouter(orderSvc);

    app.use('/', accessRouter);
    app.use('/', orderRouter);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.info(`Server listening on port ${PORT}...`);
    });
};

main();
