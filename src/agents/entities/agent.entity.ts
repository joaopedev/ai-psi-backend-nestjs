import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  basePrompt: string;

  @Column({ type: 'float', default: 0.7 })
  temperature: number;
}