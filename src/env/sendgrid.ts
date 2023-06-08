if (!process.env.SENDGRID_API_KEY)
    throw new Error(`Missing environment variable SENDGRID_API_KEY!`);

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;