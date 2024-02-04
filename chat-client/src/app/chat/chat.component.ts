import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  message: string = '';
  encryptionKey: string = 'test123';
  messages: string[] = [];
  constructor(private messageService: MessageService) {}

  sendMessage(message: string, key: string) {
    const encryptedMessage = this.messageService.encryptMessage(message, key);
    console.log(encryptedMessage);
  }

  receiveMessage(encryptedMessage: string, key: string) {
    const decryptedMessage = this.messageService.decryptMessage(
      encryptedMessage,
      key,
    );
    console.log(decryptedMessage);
  }
}
