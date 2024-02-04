import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { User } from 'src/chat';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinChat')
  async joinChat(@MessageBody() payload: { chatID: string; user: User }) {
    if (!payload.chatID || !payload.user) {
      return { error: 'Chat ID and username are required' };
    }
    if (payload.user.socketID) {
      await this.server.in(payload.chatID).socketsJoin(payload.user.socketID);
    }
  }

  @SubscribeMessage('chat')
  async chat(
    @MessageBody() payload: { chatID: string; message: string; sender: User },
  ) {
    this.server.in(payload.chatID).emit('chat', payload);
  }
}
