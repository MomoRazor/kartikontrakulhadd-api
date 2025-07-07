if (!process.env.BREVO_API_KEY) throw new Error(`Missing environment variable BREVO_API_KEY!`);

export const BREVO_API_KEY = process.env.BREVO_API_KEY;
