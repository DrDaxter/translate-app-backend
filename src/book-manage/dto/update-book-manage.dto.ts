import { PartialType } from '@nestjs/mapped-types';
import { CreateBookManageDto } from './create-book-manage.dto';

export class UpdateBookManageDto extends PartialType(CreateBookManageDto) {}
