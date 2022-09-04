import { config } from 'dotenv';

config();

export const {
    API_KEY,
    MAILGUN_SERVICE_URL,
    MAILGUN_ID,
    MAILGUN_DOMAIN,
    MAILGUN_API_KEY,
    MONGO_CONNECT_URL,
    STOCK_SIZE,
    ENVIRONMENT
} = process.env;
