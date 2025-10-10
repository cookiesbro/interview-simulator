import { Telegraf, Markup } from "telegraf";
import "dotenv/config";
import axios from "axios";

interface NgrokTunnel {
  public_url: string;
  proto: "http" | "https";
}

const getWebAppUrl = async (): Promise<string> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Запрашиваем JSON у ngrok, как и раньше
    const response = await axios.get("http://127.0.0.1:4040/api/tunnels");

    // Указываем, что data.tunnels - это массив наших туннелей
    const tunnels: NgrokTunnel[] = response.data.tunnels;

    const httpsTunnel = tunnels.find((t) => t.proto === "https");

    if (!httpsTunnel) {
      throw new Error("HTTPS tunnel not found in ngrok JSON response.");
    }

    return httpsTunnel.public_url;
  } catch (error) {
    console.error("ERROR: Could not get ngrok URL.", error);
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
    const webAppUrl = await getWebAppUrl();
    const finalWebAppUrl = `${webAppUrl}/training`;

    ctx.reply(
      "Добро пожаловать в тренажер для собеседований!",
      Markup.inlineKeyboard([
        Markup.button.webApp("🚀 Начать тренировку", finalWebAppUrl),
      ])
    );
  } catch (error) {
    console.error("Failed to process /start command:", error);
    ctx.reply("Произошла ошибка. Попробуйте снова позже.");
  }
});

bot.launch(() => {
  console.log("Telegram bot started with Long Polling.");
  console.log("Waiting for /start command...");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
