import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Pinecone } from 'src/pinecone/entities/pinecone.entity';
import { Agent } from 'src/agents/entities/agent.entity';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { AgentsService } from 'src/agents/agents.service';
import { MetaapiModule } from 'src/metaapi/metaapi.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Pinecone, Agent]),
    forwardRef(() => MetaapiModule), 
  ],
  controllers: [ChatsController],
  providers: [ChatsService, PineconeService, AgentsService],
  exports: [ChatsService],
})
export class ChatsModule {}
