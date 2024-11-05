import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDefinitionManageDto } from 'src/word-manage/dto/create-definition-manage.dto';
import { WordDefinition } from 'src/word-manage/entities/word-definition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefinitionManageService {
    constructor(
        @InjectRepository(WordDefinition)
        private readonly wordDefRepository: Repository<WordDefinition>,
    ){}


    async create(wordDefinition: CreateDefinitionManageDto){
        try {
            const definition = await this.wordDefRepository.create(wordDefinition);

            await this.wordDefRepository.save(definition);

            return definition;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Something went wrong");
        }
    }
}
