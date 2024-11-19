import { InlineKeyboard } from "grammy"
import { bot } from "../src/bot"
import { setLocalizedCommands } from "../utils/setLocalizedCommands"

const langKeyboard = new InlineKeyboard().text("Русский ", "ru").text("English", "en")

bot.command("language", async (ctx) => {
    await ctx.reply(ctx.t("langText"), {
        reply_markup: langKeyboard
    })
})

bot.callbackQuery(["en", "ru"], async ctx => {
    await ctx.answerCallbackQuery(ctx.t("lng"))
    await ctx.i18n.setLocale(ctx.callbackQuery.data);
    await ctx.deleteMessage()
    await ctx.reply(ctx.t("langSetComm"))
    await setLocalizedCommands(ctx);
})