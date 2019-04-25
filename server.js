const Telegraf = require('telegraf');
const express = require('express');
const expressApp = express();

const API_TOKEN = process.env.TELEGRAM_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.APP_URL || 'https://voz-ativa-bot.herokuapp.com';

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()

// and at the end just start server on PORT
expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.post(`/bot${API_TOKEN}`, (req, res) => {
  console.log(req);
});


expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const client = require('./client');

const WEBHOOK_TOKEN = randomstring.generate(16);

client.setWebhook(`https://voz-ativa-bot.herokuapp.com`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).send("ok");
})

app.post('/', (req, res, next) => {
  console.log(req.body.message);
  client.sendMessage(req.body.message.chat.id, 'I\'m a bot, so what?');
});

app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
*/