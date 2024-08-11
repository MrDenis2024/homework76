import {Message, MessageMutation} from './types';
import {randomUUID} from 'node:crypto';
import {promises as fs} from 'fs';

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
  async addMessage(message: MessageMutation) {
    const newMessage: Message = {
      id: randomUUID(),
      ...message,
      datetime: new Date().toISOString(),
    };
    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save () {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
};

export default fileDb;