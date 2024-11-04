import { Bot, Context } from 'grammy'
import dotenv from "dotenv"

dotenv.config()
const {
    BOT_TOKEN: token = '',
} = process.env

export const bot = new Bot(token)

bot.command("start", async (ctx) => {
    await ctx.reply("Я бот Рона и развиваюсь по мере его знаний😁")
})

bot.on('message', async ctx => {
    await ctx.reply(ctx.message.text!)
})
