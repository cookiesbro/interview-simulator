import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const webAppUrl = 'https://29d25827732c.ngrok-free.app';

const bot = new Telegraf(token);

bot.start((ctx) => {
  const finalWebAppUrl = `${webAppUrl}/training`;
  console.log(`[BOT-DEBUG] Forming button with URL: ${finalWebAppUrl}`);
  ctx.reply(
    'Добро пожаловать!',
    Markup.inlineKeyboard([
      Markup.button.webApp('🚀 Начать тренировку', finalWebAppUrl)
    ])
  );
});

bot.launch(() => {
    console.log("Telegram bot started with Long Polling");
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));