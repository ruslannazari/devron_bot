import { InlineKeyboard } from 'grammy';
import { bot } from '../src/bot';
let humanInChat: number | undefined = undefined;

const chatWithKeyboard = new InlineKeyboard()
    .text('Человек', 'human')
    .text('Бот', 'bot');

bot.command('chatwith', async (ctx) => {
    await ctx.reply('Чат с:', {
        reply_markup: chatWithKeyboard,
    });
});

bot.callbackQuery(['bot', 'human'], async (ctx) => {
    const choice = ctx.callbackQuery.data;
    await ctx.deleteMessage()
    if (choice === 'bot') {
        humanInChat = undefined;
        await ctx.reply('Бот на связи!');
    } else if (choice === 'human') {
        humanInChat = ctx.from?.id;
        await ctx.reply('Человек на связи!');
    }

});

