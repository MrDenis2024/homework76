import {Message, MessageMutation} from './types';
import {randomUUID} from 'crypto';
import {promises as fs} from 'fs';

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getMessages (queryDate: string) {
    if (queryDate) {
      return data.filter(message => message.datetime > queryDate);
    } else {
      return data.slice(-30);
    }
  },
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