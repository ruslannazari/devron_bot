import { bot } from '../src/bot'
import "../commands/all"
const {
    VERCEL_URL = 'localhost',
    VERCEL_BRANCH_URL: hostname = VERCEL_URL,
} = process.env

const url = new URL('api/webhook', `https://${hostname}`)

bot.catch(console.error)
bot.api.setWebhook(url.href)