const express = require('express');
const Telegraf = require('telegraf');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';
const APP_SECRET = process.env.APP_SECRET || 'secret'
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://voz-ativa-bot.herokuapp.com';

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${APP_SECRET}`);
app.use(bot.webhookCallback(`/bot${APP_SECRET}`));

bot.command('status', (ctx) => {
  ctx.replyWithHTML('<b>Chat ID: </b>' + ctx.chat.id)
});

bot.on('text', (ctx) => {
  ctx.replyWithHTML('<b>Received Message: </b>' + ctx.message.text)
});

app.get('/', (req, res) => {
  res.send('This is a simple application to control a Telegram BOT!');
});

app.post(`/${APP_SECRET}`, jsonParser, function (req, res) {    
  const chatID = req.body.chatID;

  bot.telegram.sendMessage(chatID, '<b>This message was send because your POST request!</b>', { parse_mode: 'HTML' })
    .then(response => {
      res.status(200).send('Check your chat with the bot.');
    })
    .catch(error => {
      console.log(error); // You can handle this better
      res.status(400).send('Sorry, something bad happened!');
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});