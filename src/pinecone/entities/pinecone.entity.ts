import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pinecone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  embedding: number[];
}