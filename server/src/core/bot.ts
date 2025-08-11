import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

const webAppUrl = 'https://interview-simulator-lilac.vercel.app/';

// Обработчик /start
bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать в тренажер для собеседований!',
    // Создаем инлайн-кнопку
    Markup.inlineKeyboard([
      // Эта кнопка будет открывать наше веб-приложение
      Markup.button.webApp('🚀 Начать тренировку', `${webAppUrl}/training`)
    ])
  );
});

export const startBot = () => {
    bot.launch(() => {
        console.log("Telegram bot started");
    });
}