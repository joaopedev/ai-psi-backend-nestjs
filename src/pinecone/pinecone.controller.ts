// src/pinecone/pinecone.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PineconeService } from './pinecone.service';

@Controller('pinecone')
export class PineconeController {
  constructor(private readonly pineconeService: PineconeService) {}

  /**
   * Consulta o Pinecone a partir de um embedding.
   */
  @Post('query')
  async query(
    @Body('embedding') embedding: number[],
    @Body('topK') topK?: number,
  ) {
    return await this.pineconeService.query(embedding, topK ?? 5);
  }

  /**
   * Insere ou atualiza vetores no Pinecone.
   */
  @Post('upsert')
  async upsert(
    @Body('vectors')
    vectors: { id: string; values: number[]; metadata?: any }[],
  ) {
    return await this.pineconeService.upsert(vectors);
  }
}
