import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordManageDto } from '../dto/create-word-manage.dto';
import { UpdateWordManageDto } from '../dto/update-word-manage.dto';
import { WordManage } from '../entities/word-manage.entity';
import { DataSource, Repository } from 'typeorm';
import { WordDefinition } from '../entities/word-definition.entity';

@Injectable()
export class WordManageService {
  constructor(
    @InjectRepository(WordManage)
    private readonly wordRepository: Repository<WordManage>,
    private readonly dataSource: DataSource
  ){}

  async create(wordManage: CreateWordManageDto) {
    try {
      const word = await this.wordRepository.create({
        ...wordManage,
        exist_definition: 0
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
    const {...wordData} = updateWordManageDto;

    const word = await this.wordRepository.preload({
      word_id: id,
      ...wordData
    });

    if(!word) throw new NotFoundException(`word with id ${id} does not exist`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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

  async remove(id: number) {
    const word = await this.findOne(id);
    const queryBuilder = this.dataSource.createQueryBuilder();

    await queryBuilder.delete()
      .from(WordDefinition)
      .where("word_id = :id",{id:id})
      .execute();

    await this.wordRepository.remove(word);

    return "Success";
  }

  async getWordsByBookId(bookId: number){
    const queryBuilder = this.wordRepository.createQueryBuilder('word');

    const words = await queryBuilder
      .where("book_id =:book_id",{
        book_id: bookId
      }).getMany()

    if(words.length === 0) throw new NotFoundException("book with doesn't have words")

    return words
  }
}
