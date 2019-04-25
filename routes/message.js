const express = require('express');
const bodyParser = require('body-parser');
const client = require('./../client');
const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res, next) => {
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