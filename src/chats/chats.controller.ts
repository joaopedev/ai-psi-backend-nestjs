import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('ask')
  ask(@Body() body: { question: string; agentId: string }) {
    return this.chatsService.ask(body.question, body.agentId);
  }
}
