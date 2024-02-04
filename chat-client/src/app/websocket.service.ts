import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket = io('http://localhost:3000/');

  constructor() {
    this.getMessages().subscribe((message) => {
      console.log(message);
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('chat', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  joinChat(chatId: string, username: string, password: string) {
    this.socket.emit('joinChat', { chatID: chatId, user: { socketID: this.socket.id, username }, password });
  }

  sendMessage(message: string, chatId: string, username: string) {
    this.socket.emit('chat', { chatID: chatId, user: { socketID: this.socket.id, username }, message: message });
  }

  /*
  constructor() {
    this.socket = new WebSocket('ws://localhost:3000/');

    this.socket.onopen = (event) => {
      console.log('Connexion websocket établie');
      this.socket.dispatchEvent(new Event('test'))
    };

    this.socket.onmessage = (event) => {
      console.log('Message reçu du serveur:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error(
        'Erreur de communication avec le serveur websocket:',
        error,
      );
    };

    this.socket.onclose = () => {
      console.log('Connexion websocket fermée');
    };
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("La connexion WebSocket n'est pas ouverte.");
    }
  }
  */


}
