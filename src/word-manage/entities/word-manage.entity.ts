import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordDefinition } from "./word-definition.entity";
import { BookManage } from "src/book-manage/entities/book-manage.entity";

@Entity({
    name: 'Word',
    synchronize: false
})
export class WordManage {
    @PrimaryGeneratedColumn('increment')
    word_id: number;

    @Column('text',{nullable:true})
    word:string;

    @Column('bool',{nullable:true})
    exist_definition: number;

    @Column('int', {nullable: false})
    book_id: number;

    //relations
    @ManyToOne(
        () => BookManage,
        (book) => book.word
    )
    @JoinColumn({
        name: 'book_id',
        referencedColumnName: 'book_id'
    })
    book: BookManage;

    @OneToOne(
        () => WordDefinition,
        (wordDefinition) => wordDefinition.word,
        {
            cascade: true,
            eager: true
        }
    )
    definition: WordDefinition;
}
