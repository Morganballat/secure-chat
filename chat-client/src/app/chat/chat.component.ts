import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { WebsocketService } from '../websocket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message: string = '';
  encryptionKey: string = 'test123';
  messages: string[] = [];
  id: string;
  password: string = '';
  loggedon: boolean = false;
  username: string = '';

  constructor(
    private messageService: MessageService,
    private webSocketService: WebsocketService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id']
    this.webSocketService.getMessages().subscribe((message) => {
      const decryptedMessage = this.messageService.decryptMessage(
        (message as any).message as string,
        this.encryptionKey,
      );
      this.messages.push((message as any).user.username + " : " + decryptedMessage);
    })
  }

  async ngOnInit() {

  }

  sendMessage(message: string, key: string) {
    const encryptedMessage = this.messageService.encryptMessage(
      message,
      this.encryptionKey,
    );

    this.webSocketService.sendMessage(encryptedMessage, this.id, this.username);
  }

  login() {
    console.log(this.id, this.password);
    this.webSocketService.joinChat(this.id, this.username, this.password);
    this.loggedon = true;
  }
}
