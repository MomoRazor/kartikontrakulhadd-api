import { config } from 'dotenv';

config();

if (!process.env.MONGO_URL) throw new Error(`Missing environment variable MONGO_URL!`);

export const MONGO_URL = process.env.MONGO_URL;

if (!process.env.JWT_SECRET) throw new Error(`Missing environment variable JWT_SECRET!`);
export const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.API_KEY) throw new Error(`Missing environment variable API_KEY!`);

export const API_KEY = process.env.API_KEY;

if (!process.env.MAIL_SERVICE_URL) throw new Error(`Missing environment variable MAIL_SERVICE_URL!`);

export const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL;

if (!process.env.STOCK_SIZE) throw new Error(`Missing environment variable STOCK_SIZE!`);

export const STOCK_SIZE = process.env.STOCK_SIZE;

if (!process.env.ADMIN_EMAILS) throw new Error('Missing environment variable ADMIN_EMAILS!')

export const ADMIN_EMAILS = process.env.ADMIN_EMAILS;
