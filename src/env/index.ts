import { config } from 'dotenv';

config();

export * from './mongo'
export * from './sendgrid'

export const API_KEY = process.env.API_KEY;

if (!process.env.STOCK_SIZE) throw new Error(`Missing environment variable STOCK_SIZE!`);

export const STOCK_SIZE = process.env.STOCK_SIZE;

if (!process.env.ADMIN_EMAILS) throw new Error('Missing environment variable ADMIN_EMAILS!')

export const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(',');