import express from 'express';
import {MessageMutation} from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res) => {
  if(!req.body.message || !req.body.author) {
    return res.status(400).send({error: 'Author and message must be present in the request'});
  }

  const message: MessageMutation = {
    message: req.body.message,
    author: req.body.author,
  };

  const savedMessage = await fileDb.addMessage(message);
  return res.send(savedMessage);
});

export default messagesRouter;