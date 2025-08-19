import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const webAppUrl = process.env.WEB_APP_URL || 'https://localhost:5173';

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать в тренажер для собеседований!',
    Markup.inlineKeyboard([
      Markup.button.webApp('🚀 Начать тренировку', `${webAppUrl}/training`)
    ])
  );
});

export const startBot = () => {
    bot.launch(() => {
        console.log("Telegram bot started");
    });
}