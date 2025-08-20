import { Telegraf, Markup } from "telegraf";
import "dotenv/config";
import axios from "axios";

// 1. Описываем, как выглядит объект туннеля от ngrok
interface NgrokTunnel {
  name: string;
  uri: string;
  public_url: string;
  proto: "http" | "https";
  config: {
    addr: string;
    inspect: boolean;
  };
  metrics: object;
}

const getNgrokUrl = async (): Promise<string> => {
  try {
    const response = await axios.get("http://127.0.0.1:4040/api/tunnels");
    const tunnels: NgrokTunnel[] = response.data.tunnels;
    const httpsTunnel = tunnels.find((t) => t.proto === "https");

    if (!httpsTunnel) {
      throw new Error("HTTPS tunnel not found in ngrok. Is it running?");
    }
    return httpsTunnel.public_url;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Could not connect to ngrok API. Is ngrok running?",
        error.message
      );
    } else {
      console.error(
        "An unknown error occurred while connecting to ngrok API",
        error
      );
    }
    throw error;
  }
};

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  try {
    const webAppUrl = await getNgrokUrl(); // Получаем URL динамически
    const finalWebAppUrl = `${webAppUrl}/training`;
    console.log(`[BOT-DEBUG] Forming button with URL: ${finalWebAppUrl}`);

    ctx.reply(
      "Добро пожаловать!",
      Markup.inlineKeyboard([
        Markup.button.webApp("🚀 Начать тренировку", finalWebAppUrl),
      ])
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to get ngrok URL for reply", error.message);
    } else {
      console.error("An unknown error occurred while forming reply", error);
    }
    ctx.reply("Ошибка: не удалось получить адрес для запуска приложения.");
  }
});

bot.launch(() => {
  console.log("Telegram bot started with Long Polling");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));