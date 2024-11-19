import { MyContext } from "../types/myContext";


export async function setLocalizedCommands(ctx: MyContext) {
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