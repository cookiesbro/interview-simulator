import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

export const startBot = () => {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN must be provided!');
  }

  // Используем WEB_APP_URL из переменных окружения
  const webAppUrl = process.env.WEB_APP_URL;
  if (!webAppUrl) {
    throw new Error('WEB_APP_URL must be provided!');
  }

  const bot = new Telegraf(token);

  bot.start((ctx) => {
    const finalWebAppUrl = `${webAppUrl}/training`;
    console.log(`[BOT-PROD] Forming button with URL: ${finalWebAppUrl}`);
    ctx.reply(
      "Добро пожаловать в тренажер для собеседований!",
      Markup.inlineKeyboard([
        Markup.button.webApp("🚀 Начать тренировку", finalWebAppUrl)
      ])
    );
  });

  bot.launch(() => {
    console.log("Telegram bot started with Long Polling (Production).");
  });

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};