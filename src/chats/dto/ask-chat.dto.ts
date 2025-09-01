import { IsString } from 'class-validator';

export class AskChatDto {
  @IsString()
  question: string;

  @IsString()
  agentId: string;
}