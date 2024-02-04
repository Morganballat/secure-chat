import { Injectable } from '@nestjs/common';
import { Chat, User } from './chat';

@Injectable()
export class AppService {

  chats: Chat[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  createChat(password: string): Chat {
    let chat = {
      id: this.generateUniqueID(),
      messages: [],
      password: password
    }
    this.chats.push(chat);
    return chat;
  }

  getChat(id: string): Chat | undefined {
    let chat = this.chats.find(chat => chat.id === id);
    if (chat) {
      return chat;
    } else {
      return undefined;
    }
  }

  addMessageToChat(id: string, message: string, sender: User): Chat | undefined {
    let chat = this.chats.find(chat => chat.id === id);
    if (chat) {
      chat.messages.push({
        id: (chat.messages.length + 1),
        text: message,
        sender: sender
      });
      return chat;
    } else {
      return undefined;
    }
  }

  generateUniqueID(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let uniqueID = '';

    for (let i = 0; i < 10; i++) {
      uniqueID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return uniqueID;
  }
}
