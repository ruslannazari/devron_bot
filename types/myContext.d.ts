import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";

interface SessionData {
    __language_code?: string;
}

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;