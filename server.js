const Telegraf = require('telegraf')
const express = require('express')
const bodyParser = require("body-parser")
const randomstring = require('randomstring')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
const webhookToken = randomstring.generate(16)
console.log(webhookToken)

app.use(bot.webhookCallback('/' + webhookToken))
bot.telegram.setWebhook(process.env.APP_URL + webhookToken)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/' + webhookToken, (req, res) => {
  console.log(req)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
})

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