require('dotenv').config({ path: ".env" });

const express = require('express');
const Telegraf = require('telegraf');
const bodyParser = require('body-parser');

const db = require('./database');

const app = express();

var jsonParser = bodyParser.json();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';
const APP_SECRET = process.env.APP_SECRET || 'secret';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://voz-ativa-bot.herokuapp.com';

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${APP_SECRET}`);
app.use(bot.webhookCallback(`/bot${APP_SECRET}`));

/**
 * Gerenciador de comandos do bot
 */
bot.command('status', ctx => {
  ctx.replyWithHTML('<b>Seu chat ID: </b>' + ctx.chat.id);
});

bot.on('text', ctx => {
  ctx.replyWithHTML('<b>Recebido: </b>' + ctx.message.text);
});

/**
 * Rotas do servidor web
 */
app.get('/', (req, res) => {
  res.status(200).send('Voz Ativa!');
});

app.post(`/${APP_SECRET}`, jsonParser, (req, res) => {
  const message = req.body.message;

  if (!message) {
    res.status(200).send('Nenhuma mensagem recebida.');
    return;
  }

  // Envia mensagens para os admins
  db.getAdmins().then(results => {

    results.rows.forEach(admin => {
      bot.telegram
        .sendMessage(admin.chatid, message, { parse_mode: 'HTML' })
        .then(response => {
          res.status(200).send('Mensagem enviada!');
        })
        .catch(error => {
          console.log(error);
          res.status(400).send('Não foi possível enviar a mensagem');
        });
    });
  })
  .catch(error => {
    console.log(error);
    res.status(400).send('Não foi possível encontrar os admins');
  });

  // Salva mensagem no log
  db.saveLog(message).then(results => {
    console.log('Log salvo com sucesso');
  })
  .catch(error => {
    console.log(error);
    res.status(400).send('Não foi possível salvar o log');
  })
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
