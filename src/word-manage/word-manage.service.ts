import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordManageDto } from './dto/create-word-manage.dto';
import { UpdateWordManageDto } from './dto/update-word-manage.dto';
import { WordManage } from './entities/word-manage.entity';
import { DataSource, Repository } from 'typeorm';
import { WordDefinition } from './entities/word-definition.entity';

@Injectable()
export class WordManageService {
  constructor(
    @InjectRepository(WordManage)
    private readonly wordRepository: Repository<WordManage>,
    @InjectRepository(WordDefinition)
    private readonly wordDefRepository: Repository<WordDefinition>,
    private readonly dataSource: DataSource
  ){}

  async create(createWordManageDto: CreateWordManageDto) {
    const {definition = "no definition", ...wordData} = createWordManageDto;
    try {
      const word = await this.wordRepository.create({
        ...wordData,
        definition: this.wordDefRepository.create({definition: definition})
      });
      
      await this.wordRepository.save(word);

      return word;
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Something went wrong");
    }
  }

  async findAll() {
    try {
      const data = await this.wordRepository.find({
        relations: ["definition"]
      });
      return data;
    } catch (error) {
      console.log("Error below");
      console.log(error);
      throw new InternalServerErrorException("Something went wrong, see the logs");
    }
  }

  async findOne(id: number) {
    let data: WordManage;
    try {
      data = await this.wordRepository.findOneBy({word_id: id});
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Something went wrong, see the logs");
    }

    if(!data){
      throw new NotFoundException(`data with id: ${id} does not exist`);
    }
    return data;
  }

  async update(id: number, updateWordManageDto: UpdateWordManageDto) {
    const {definition, ...wordData} = updateWordManageDto;

    const word = await this.wordRepository.preload({
      word_id: id,
      ...wordData
    });

    if(!word) throw new NotFoundException(`word with id ${id} does not exist`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if(definition){
        await queryRunner.manager.delete(WordDefinition, {word_id:{word_id: id}});
        word.definition = this.wordDefRepository.create({definition: definition});
      }
      await queryRunner.manager.save(word);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updateWordManageDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      console.log(error);
      throw new InternalServerErrorException("Something went wrong, see the logs");
    }
  }

  remove(id: number) {
    return `This action removes a #${id} wordManage`;
  }
}
