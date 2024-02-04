import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  message: string = '';
  encryptionKey: string = 'test123';
  messages: string[] = [];
  constructor(
    private messageService: MessageService,
    private webSocketService: WebsocketService,
  ) {}

  sendMessage(id: number, message: string, key: string) {
    const encryptedMessage = this.messageService
      .postChat(id, message, key)
      .subscribe((response: any) => {
        const encryptedMessage = response.encryptedMessage;
        this.webSocketService.sendMessage(encryptedMessage);
      });
    this.receiveMessage(this.message);
    this.message = '';
  }

  receiveMessage(encryptedMessage: string) {
    const decryptedMessage = this.messageService.decryptMessage(
      encryptedMessage,
      this.encryptionKey,
    );
    this.messages.push(decryptedMessage);
  }
}
