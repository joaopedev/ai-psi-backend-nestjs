import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pinecone, Index, IndexStatsDescription, PineconeRecord } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService implements OnModuleInit {
  private pinecone: Pinecone;
  private index: Index;
  private indexName: string;

  constructor() {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('❌ PINECONE_API_KEY não está definido nas variáveis de ambiente');
    }
    if (!process.env.PINECONE_INDEX_NAME) {
      throw new Error('❌ PINECONE_INDEX_NAME é obrigatório');
    }

    this.indexName = process.env.PINECONE_INDEX_NAME;
  }

  async onModuleInit() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const indexList = await this.pinecone.listIndexes();
    if (!indexList.indexes?.some((idx) => idx.name === this.indexName)) {
      throw new Error(`❌ O índice "${this.indexName}" não foi encontrado no Pinecone`);
    }

    this.index = this.pinecone.index(this.indexName);

    console.log(`✅ Pinecone conectado ao índice existente: ${this.indexName}`);
  }

  /**
   * Upsert de documentos no índice já existente.
   */
  async upsert(
    records: Array<PineconeRecord>, // 👈 tipo correto
    namespace = 'default',
  ): Promise<{ status: string; count: number; stats: IndexStatsDescription }> {
    const idx = this.index.namespace(namespace);

    await idx.upsert(records);

    const stats = await this.index.describeIndexStats();

    console.log('📊 Index stats:', stats);
    console.log(
      `📌 ${records.length} registros inseridos no índice "${this.indexName}"`,
    );

    return { status: 'ok', count: records.length, stats };
  }

  async query(vector: number[], topK = 5, namespace = ''): Promise<string> {
    const idx = this.index.namespace(namespace);

    const result = await idx.query({
      vector,
      topK,
      includeMetadata: true,
    });

    if (!result.matches || result.matches.length === 0) return '';

    return result.matches
      .map((match) => {
        const filename = match.metadata?.filename ?? 'Documento desconhecido';
        const page = match.metadata?.page ?? '?';
        const text = match.metadata?.text ?? '';
        return `📄 Documento: ${filename} (pág. ${page})\n${text}`;
      })
      .join('\n\n---\n\n');
  }
}
