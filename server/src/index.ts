import { startApi } from "./core/server"; // Мы экспортируем функцию из server.ts
import { startBot } from "./core/bot"; // И экспортируем функцию из bot.ts

// Запускаем оба сервиса
startApi();
startBot();

console.log("Application started with API and Bot");
