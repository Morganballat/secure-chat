import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppService } from 'src/app.service';
import { User } from 'src/chat';
import * as hash from "hash.js";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) { }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('joinChat')
  async joinChat(@MessageBody() payload: { chatID: string; user: User; password: string; }) {
    console.log(payload)
    if (!payload.chatID || !payload.user) {
      return { error: 'Chat ID and username are required' };
    }
    if (hash.sha256().update(payload.password).digest('hex') != this.appService.getChat(payload.chatID).password) {
      return { error: 'Invalid password' };
    }
    if (payload.user.socketID) {
      await this.server.in(payload.user.socketID).socketsJoin(payload.chatID);
      console.log(this.server.sockets.adapter.rooms);
    }
  }

  @SubscribeMessage('chat')
  async chat(
    @MessageBody() payload: { chatID: string; message: string; sender: User },
  ) {
    console.log('chat', payload);
    this.server.in(payload.chatID).emit('chat', payload);
  }

  @SubscribeMessage('test')
  async test(@MessageBody() payload: any) {
    console.log('test', payload);
    this.server.emit('test', payload);
  }
}
