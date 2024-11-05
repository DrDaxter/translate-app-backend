import { WordDefinition } from "src/word-manage/entities/word-definition.entity";
import { WordManage } from "src/word-manage/entities/word-manage.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'Book',
    synchronize: false
})
export class BookManage {
    @PrimaryGeneratedColumn('increment')
    book_id: number;

    @Column('text', {nullable: false})
    book_name: string;

    @Column('bool', {nullable: false})
    state: boolean;

    @OneToMany(
        () => WordManage,
        (word) => word.book,
        {
            cascade: true,
            eager: true
        }
    )
    word: WordDefinition[];
}
