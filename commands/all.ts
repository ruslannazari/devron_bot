import { bot } from "../src/bot"
import "./start"
import "./chatwith"
import "./greeting"
import "./language"

bot.on("message", async (ctx) => {
    ctx.reply("Message")
})