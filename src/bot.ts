import { Bot, Context, InlineKeyboard, session, SessionFlavor } from 'grammy'
import dotenv from "dotenv"
import { I18n, I18nFlavor } from "@grammyjs/i18n";

interface SessionData {
    __language_code?: string;
}
type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;

dotenv.config()
const {
    BOT_TOKEN: token = '',
} = process.env

export const bot = new Bot<MyContext>(token)

const i18n = new I18n<MyContext>({
    defaultLocale: "ru",
    directory: "locales",
    useSession: true,
});

bot.use(
    session({
        initial: () => {
            return {};
        },
    }),
);

bot.use(i18n);

async function setLocalizedCommands(ctx: MyContext) {
    await ctx.api.setMyCommands([
        {
            command: "start",
            description: ctx.t("commandStart"),
        },
        {
            command: "greeting",
            description: ctx.t("commandGreeting"),
        },
        {
            command: "language",
            description: ctx.t("commandLanguage"),
        },
    ]);
}


bot.command("start", async (ctx) => {
    await setLocalizedCommands(ctx)
    await ctx.reply(ctx.t("startText"))
})
bot.command("greeting", async (ctx) => {
    const admin = 1915118825
    if (ctx.from?.id == admin) {
        await ctx.reply(ctx.t("greetingRonText"))
    }
    else {
        await ctx.reply(`${ctx.t("greetingText")} ${ctx.from?.first_name}`)
    }
})



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
bot.on('message', async ctx => {
    await ctx.reply(ctx.message.text!)
})
