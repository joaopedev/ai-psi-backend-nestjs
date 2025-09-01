import { forwardRef, Module } from '@nestjs/common';
import { MetaapiService } from './metaapi.service';
import { MetaapiController } from './metaapi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/agents/entities/agent.entity';
import { AgentsService } from 'src/agents/agents.service';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]),
    forwardRef(() => ChatsModule)
  ],
  controllers: [MetaapiController],
  providers: [MetaapiService, AgentsService, PineconeService],
  exports: [MetaapiService],
})
export class MetaapiModule {}
