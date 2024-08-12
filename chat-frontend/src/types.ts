export interface IMessage {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

export type MessageMutation = Omit<IMessage, 'id'| 'datetime'>;