import { Telegraf } from "telegraf";
import dbquery from "../DB/index";

import Log from "../src/log";

import { ExtContext, NewsInfo } from "./interface";
let wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Service {
  private bot: Telegraf<ExtContext>;

  constructor(bot: Telegraf<ExtContext>) {
    this.bot = bot;
  }

  async news() {
    //Запускаем вечный цикл
    while (true) {
      if (new Date().getHours() > 8 && new Date().getHours() < 23) {
        let newsInfo = (await dbquery("GET_NEWS", [], true)) as
          | NewsInfo
          | false;
        if (newsInfo) {
          let messageP = newsInfo.news.split("<p>");
          let message = `<b>${newsInfo.title}</b>\n`;
          let message2 = "";
          let nextM = false;
          for (let i = 0; i < messageP.length; i++) {
            if (message.length + messageP[i].length < 1024 && nextM == false)
              message += messageP[i] + "\n";
            else nextM = true;

            if (nextM) message2 += messageP[i];
          }
          //console.log(message);
          //console.log(message2);
          if (newsInfo.image !== null) {
            await this.bot.telegram
              .sendPhoto(-1002026413716, newsInfo.image, {
                caption: message,
                parse_mode: "HTML",
              })
              .catch(async function (error) {
                Log.error("SERVICE", error.response.description);
              });
          }
          if (newsInfo.video !== null) {
            await this.bot.telegram
              .sendMessage(-1002026413716, message, { parse_mode: "HTML" })
              // .sendVideo(-1002026413716, "https:" + newsInfo.video, {
              //   caption: message,
              //   parse_mode: "HTML",
              // })
              .catch(async function (error) {
                Log.error("SERVICE", error);
              });
            console.log("send video complete.");
          }
          if (message2.length > 0) {
            await this.bot.telegram
              .sendMessage(-1002026413716, message2, { parse_mode: "HTML" })
              .catch(async function (error) {
                Log.error("SERVICE", error.response.description);
              });
          }
          await dbquery("SET_NEWS_USED", [newsInfo.ID]);
        }
      }
      await wait(60000);
    }
  }
}

export default Service;
