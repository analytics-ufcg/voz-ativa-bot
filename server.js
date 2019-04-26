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
  ctx.replyWithHTML('<b>Chat ID: </b>' + ctx.chat.id);
});

bot.on('text', ctx => {
  ctx.replyWithHTML('<b>Received Message: </b>' + ctx.message.text);
});

/**
 * Rotas do servidor web
 */
app.get('/', (req, res) => {
  res.status(200).send('Voz Ativa!');
});

app.post(`/${APP_SECRET}`, jsonParser, (req, res) => {
  const message = req.body.message || 'empty message';

  db.getAdmins().then(results => {

    results.rows.forEach(admin => {
      bot.telegram
        .sendMessage(admin.chatid, message, { parse_mode: 'HTML' })
        .then(response => {
          db.saveLog(message).then(results => {
            res.status(200).send('Mensagem enviada!');
          })
          .catch(error => {
            console.log(error);
            res.status(400).send('Não foi possível salvar o log');
          })
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
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
