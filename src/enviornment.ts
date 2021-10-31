import { config } from 'dotenv';

config();

export const {
    SERVICE_PROVIDER_DOMAINS,
    MAILGUN_SERVICE_URL,
    MAILGUN_ID,
    MAILGUN_DOMAIN,
    MONGO_CONNECT_URL,
    STOCK_SIZE,
    NODE_ENV
} = process.env;
