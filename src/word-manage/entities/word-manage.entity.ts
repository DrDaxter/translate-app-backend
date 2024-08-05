import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordDefinition } from "./word-definition.entity";

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

    @OneToOne(
        () => WordDefinition,
        (wordDefinition) => wordDefinition.word_id,
        {
            cascade: true,
            eager: true
        }
    )
    definition: WordDefinition;
}
