import { Body, Controller, Get, Param, Post, Render, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() }
  }

  @Get('create')
  createChat() {
    let chat = this.appService.createChat();
    return { chat: chat };
  }

  @Get('chat/:id')
  @Render('chat')
  getChat(@Param('id') id: string) {
    let chat = this.appService.getChat(id);
    if (chat) {
      return { chat: chat };
    } else {
      return { error: 'Chat not found' };
    }
  }

  @Post('chat/:id')
  addMessageToChat(@Param('id') id: string, @Body() body: { message: string, sender: string }) {
    if (!body.message || !body.sender) {
      return { error: 'Message and sender are required' };
    }
    let chat = this.appService.addMessageToChat(id, body.message, { username: body.sender, socketID: '' });
    return { chat: chat };
  }

  @Sse('chat/:id/stream')
  stream(@Param('id') id: string) {
    let observable = from(this.appService.getChat(id).messages);
    if (observable) {
      return observable;
    } else {
      return { error: 'Chat not found' };
    }
  }
}
