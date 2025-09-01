// src/chat/chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MetaapiService } from '../metaapi/metaapi.service';
import { PineconeService } from '../pinecone/pinecone.service';
import { AgentsService } from '../agents/agents.service';

@Injectable()
export class ChatsService {
  constructor(
    private readonly metaApi: MetaapiService,
    private readonly pinecone: PineconeService,
    private readonly agents: AgentsService,
  ) {}

  async ask(question: string, agentId: string) {
    // 1. Recupera agente no banco
    const agent = await this.agents.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agente com ID ${agentId} não encontrado.`);
    }

    // 2. Gera embedding da pergunta
    const questionEmbedding = await this.metaApi.generateEmbedding(question);

    // 3. Consulta Pinecone (namespace vazio, igual ao seu script Python)
    const context = await this.pinecone.query(questionEmbedding, 10, '');

    // 4. Monta o prompt dinamicamente
    let fullPrompt: string;

    if (context && context.trim().length > 0) {
      // ✅ Caso haja documentos relevantes no Pinecone
      fullPrompt = `${agent.basePrompt}

Use SOMENTE o contexto abaixo para responder à pergunta.
Se a resposta não estiver no contexto, diga claramente que não encontrou informações.

Contexto:
${context}

Pergunta: ${question}`;
    } else {
      // 🚫 Sem contexto → forçamos a resposta de "não encontrado"
      fullPrompt = `${agent.basePrompt}

Não foram encontrados documentos relevantes no índice.
Responda de forma clara: "Não encontrei informações sobre isso nos meus documentos."`;
    }

    // 5. Chama MetaAPI com temperatura do agente
    const response = await this.metaApi.sendMessage(
      fullPrompt,
      agent.temperature,
    );

    return response;
  }
}
