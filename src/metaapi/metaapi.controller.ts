// src/metaapi/metaapi.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MetaapiService } from './metaapi.service';

@Controller('metaapi')
export class MetaapiController {
  constructor(private readonly metaapiService: MetaapiService) {}

  /**
   * Envia um prompt para a API MetaAPI.
   */
  @Post('send-message')
  async sendMessage(
    @Body('prompt') prompt: string,
    @Body('temperature') temperature: number,
  ) {
    return await this.metaapiService.sendMessage(prompt, temperature);
  }

  /**
   * Gera um embedding usando o modelo da OpenAI.
   */
  @Post('generate-embedding')
  async generateEmbedding(@Body('text') text: string) {
    return await this.metaapiService.generateEmbedding(text);
  }
}
