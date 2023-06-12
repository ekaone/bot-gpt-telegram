const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TELEGRAM_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there.."));
bot.on("message", (ctx) => {
  ctx.sendChatAction("typing");
  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: ctx.message.text,
      max_tokens: 2048,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .then((response) => {
      const generatedText = response.data.choices[0].text;
      console.log(generatedText);
      ctx.reply(generatedText);
    })
    .catch((error) => {
      console.log(error);
    });
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
