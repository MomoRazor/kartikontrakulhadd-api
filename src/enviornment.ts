import { config } from 'dotenv';

config();

export const {
    SERVICE_PROVIDER_DOMAINS,
    MAILGUN_SERVICE_URL,
    // PAYPAL_SERVICE_URL,
    MAILGUN_ID,
    MAILGUN_DOMAIN
    // PAYPAL_CLIENT_ID,
    // PAYPAL_CLIENT_SECRET
} = process.env;
