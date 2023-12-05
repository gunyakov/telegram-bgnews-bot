#!/usr/bin/env node
import axios from "axios";
import * as cheerio from "cheerio";
import process from "process";
import { createHash } from "crypto";
import Log from "./src/log";
import query from "./DB/index";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["User-Agent"] =
  "Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0";

(async () => {
  Log.info("SERVICE", "Start parser for nova.bg");
  let response = await axios.get("https://nova.bg/filter/all");
  let newsAdd: number = 0;
  let newsSkip: number = 0;
  if (response.status == 200) {
    let $ = cheerio.load(response.data);
    let linksList = $(".gtm-LastListNews-click").toArray();
    for (let i = 0; i < linksList.length; i++) {
      let el = linksList[i];
      let url = $(el).attr("href") as string;
      let hash = createHash("md5").update(url).digest();
      let db = (await query("CHECK_NEWS", ["novabg", hash], true)) as
        | false
        | { ID: number };
      if (!db) {
        let subR = await axios.get(url);
        //let subR = await axios.get("https://nova.bg/news/view/2023/11/20/433966/%D0%BF%D0%B0%D0%BF%D1%83%D0%BA%D1%87%D0%B8%D0%B5%D0%B2-%D0%BF%D1%80%D0%B8-%D0%BF%D0%B8%D1%80%D0%B0%D1%82%D1%81%D0%BA%D0%B0-%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82-%D0%BC%D0%BE%D0%B6%D0%B5-%D0%B4%D0%B0-%D1%81%D0%B5-%D0%BD%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B0%D1%82-%D0%B4%D0%BE%D0%BF%D1%8A%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D0%BD%D0%B8-%D0%B2%D1%8A%D0%BE%D1%80%D1%8A%D0%B6%D0%B5%D0%BD%D0%B8-%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D0%B8-%D0%BD%D0%B0-%D0%BA%D0%BE%D1%80%D0%B0%D0%B1/");
        if (subR.status == 200) {
          let $$ = cheerio.load(subR.data);
          let title = $$(".title-wrap-roboto > h1").text();
          let imgUrl =
            $$(".article-content")
              .children("div")
              .children("div")
              .children("div")
              .children("img")
              .attr("src") || null;
          let videoUrl = $$(".embed-responsive > iframe").attr("src") || null;
          let text = "";
          $$(".article-body")
            .find("p")
            .each((index, el) => {
              if ($$(el).find("a").length == 0) {
                text += "<p>" + $$(el).text();
              }
            });
          await query("INSERT_NEWS", [
            "novabg",
            hash,
            title,
            imgUrl,
            videoUrl,
            text,
          ]);
          newsAdd++;
        }
      } else {
        newsSkip++;
      }
    }
  } else {
    Log.error("SERVICE", `nova.bg parser error: ${response.status}`);
    process.exit();
  }
  Log.success("SERVICE", `Add: ${newsAdd}, skip: ${newsSkip}`);
  process.exit();
})();
