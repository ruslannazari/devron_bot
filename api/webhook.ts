import { bot } from '../src/bot'
import { webhookCallback } from 'grammy'
import "../commands/all"
export default webhookCallback(bot, 'http')
