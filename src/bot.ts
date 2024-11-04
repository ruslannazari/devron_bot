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
bot.command("greeting", async (ctx) => {
    const admin = 1915118825
    if (ctx.from?.id == admin) {
        await ctx.reply(`Привет Рон`)
    }
    else {
        await ctx.reply(`Привет ${ctx.from?.first_name}`)
    }
})
bot.on('message', async ctx => {
    await ctx.reply(ctx.message.text!)
})
