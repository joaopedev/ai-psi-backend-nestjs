import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreatePineconeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  embedding?: number[];
}