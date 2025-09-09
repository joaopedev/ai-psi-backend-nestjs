import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/agents/entities/agent.entity';
import { OpenAI } from 'openai';
import axios from 'axios';

@Injectable()
export class MetaapiService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessage(prompt: string, temperature: number) {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', // ou gpt-4o-mini (mais rápido e barato)
        messages: [
          { role: 'system', content: 'Você é um assistente útil.' },
          { role: 'user', content: prompt },
        ],
        temperature,
        max_tokens: 1200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return res.data.choices[0].message.content;
  }
  

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });

    return response.data[0].embedding;
  }
}
