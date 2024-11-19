import { bot } from '../src/bot'
import "../commands/all"

bot.catch(console.error)

bot.start()