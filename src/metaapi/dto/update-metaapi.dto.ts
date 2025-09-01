import { PartialType } from '@nestjs/mapped-types';
import { CreateMetaapiDto } from './create-metaapi.dto';

export class UpdateMetaapiDto extends PartialType(CreateMetaapiDto) {}
