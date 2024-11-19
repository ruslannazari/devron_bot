import { Bot, session } from 'grammy'
import dotenv from "dotenv"
import { I18n } from "@grammyjs/i18n";
import { MyContext } from '../types/myContext';


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

