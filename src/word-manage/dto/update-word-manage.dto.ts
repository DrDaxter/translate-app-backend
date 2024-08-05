import { PartialType } from '@nestjs/mapped-types';
import { CreateWordManageDto } from './create-word-manage.dto';

export class UpdateWordManageDto extends PartialType(CreateWordManageDto) {}
