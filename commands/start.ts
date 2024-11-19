import { bot } from "../src/bot"
import { setLocalizedCommands } from "../utils/setLocalizedCommands"


bot.command("start", async (ctx) => {
    await setLocalizedCommands(ctx)
    await ctx.reply(ctx.t("startText"))
})