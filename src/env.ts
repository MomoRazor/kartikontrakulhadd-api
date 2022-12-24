import { config } from 'dotenv';

config();

if (!process.env.MONGO_URL) throw new Error(`Missing environment variable MONGO_URL!`);

export const MONGO_URL = process.env.MONGO_URL;

if (!process.env.RBAC_SECRET && !process.env.API_KEY)
    throw new Error(`Missing both RBAC_SECRET and API_KEY environment variables!`);

export const RBAC_SECRET = process.env.RBAC_SECRET;
export const API_KEY = process.env.API_KEY;

if (!process.env.MAIL_SERVICE_URL) throw new Error(`Missing environment variable MAIL_SERVICE_URL!`);

export const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL;

if (!process.env.STOCK_SIZE) throw new Error(`Missing environment variable STOCK_SIZE!`);

export const STOCK_SIZE = process.env.STOCK_SIZE;

if (!process.env.ADMIN_EMAILS) throw new Error('Missing environment variable ADMIN_EMAILS!')

export const ADMIN_EMAILS = process.env.ADMIN_EMAILS;
