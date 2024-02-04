import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onopen = () => {
      console.log('Connexion websocket établie');
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
}
