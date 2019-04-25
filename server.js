const express = require('express');
const client = require('./client');
const randomstring = require('randomstring');

const WEBHOOK_TOKEN = randomstring.generate(16);

client.setWebhook(`https://voz-ativa-bot.herokuapp.com/${WEBHOOK_TOKEN}`);

const app = express();
app.use(`/${WEBHOOK_TOKEN}`, require('./routes/message'));