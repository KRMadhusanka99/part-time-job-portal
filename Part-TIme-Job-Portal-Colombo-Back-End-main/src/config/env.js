import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT;
export const JwT_SECRET = process.env.JwT_SECRET;