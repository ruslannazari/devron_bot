import { bot } from "../src/bot";

const RUSIK = 7719346387
const ADMIN = 1915118825

async function sendMessageToUser(userId: string, messageText: string) {
    try {
        await bot.api.sendMessage(userId, messageText);
        console.log(`Сообщение отправлено пользователю с ID: ${userId}`);
    } catch (error) {
        console.error(`Не удалось отправить сообщение пользователю с ID: ${userId}`, error);
    }
}
bot.command('send', async (ctx) => {
    const args = ctx.message!.text.split(' ').slice(1); // Получаем аргументы команды
    const userId = args[0];
    const messageText = args.slice(1).join(' ');

    if (!userId || !messageText) {
        return ctx.reply('Использование: /send <user_id> <сообщение>');
    }

    await sendMessageToUser(userId, messageText);
    ctx.reply(`Сообщение отправлено пользователю с ID: ${userId}`);
});

bot.command('reply', async (ctx) => {
    const args = ctx.message!.text.split(' ').slice(1); // Получаем аргументы команды

    // Проверяем, что передан ID сообщения и текст ответа
    if (args.length < 2) {
        return ctx.reply("Использование: /answer <message_id> <ответ>");
    }

    const messageId = parseInt(args[0], 10); // Первый аргумент — ID сообщения
    const responseText = args.slice(1).join(' '); // Оставшиеся аргументы — текст ответа

    try {
        // Отправляем ответ на указанное сообщение в целевом чате
        await ctx.api.sendMessage(RUSIK, responseText, {
            reply_to_message_id: messageId,
        });
        ctx.reply(`Ответ отправлен в чат с ID ${RUSIK} на сообщение с ID ${messageId}`);
    } catch (error) {
        console.error(`Не удалось отправить ответ в чат с ID ${RUSIK} на сообщение с ID ${messageId}`, error);
        ctx.reply("Произошла ошибка при отправке ответа.");
    }
});
bot.on(":sticker", async (ctx) => {
    if (ctx.from?.id === ADMIN) {
        await bot.api.sendSticker(RUSIK, ctx.message!.sticker.file_id)
    }
    else if (ctx.from?.id === RUSIK) {
        await bot.api.sendSticker(ADMIN, ctx.message!.sticker.file_id)
    }
    else {

    }
})
bot.on('message', async ctx => {
    if (ctx.from.id === ADMIN) {
        await bot.api.sendMessage(RUSIK, ctx.message.text!)
    }
    else if (ctx.from.id === RUSIK) {
        await bot.api.sendMessage(ADMIN, ctx.message.text!)
    }
    else {
        await ctx.reply(ctx.message.text!)
        console.log(ctx.message)
    }
})