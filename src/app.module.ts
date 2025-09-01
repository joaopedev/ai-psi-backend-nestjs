import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './agents/agents.module';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
import { PineconeModule } from './pinecone/pinecone.module';
import { MetaapiModule } from './metaapi/metaapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "ai_psi_backend",
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AgentsModule,  
    ChatsModule,
    PineconeModule,
    MetaapiModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
