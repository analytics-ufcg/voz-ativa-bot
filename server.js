const express = require('express');
const randomstring = require('randomstring');
const client = require('./client');

const WEBHOOK_TOKEN = randomstring.generate(16);

client.setWebhook(`https://voz-ativa-bot.herokuapp.com/${WEBHOOK_TOKEN}`);

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send("ok");
})

app.post(`/${WEBHOOK_TOKEN}/`, (req, res, next) => {
  console.log(req.body.message);
    client
        .sendMessage(req.body.message.chat.id, 'I\'m a bot, so what?')
        .promise()
        // replying succeeded, so we can send a 200 response to Telegram
        // the actual payload does not matter
        .then(() => res.json({ ok: true }))
        // something above failed, we will use express' default error handling
        .catch(next);
});