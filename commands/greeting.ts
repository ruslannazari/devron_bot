import { bot } from "../src/bot"

bot.command("greeting", async (ctx) => {
    const admin = 1915118825
    if (ctx.from?.id == admin) {
        await ctx.reply(ctx.t("greetingRonText"))
    }
    else {
        await ctx.reply(`${ctx.t("greetingText")} ${ctx.from?.first_name}`)
    }
})