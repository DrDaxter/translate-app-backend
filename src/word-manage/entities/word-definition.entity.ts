import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordManage } from "./word-manage.entity";

@Entity({
    name: 'Word_definition',
    synchronize: false
})
export class WordDefinition{
    @PrimaryGeneratedColumn('increment')
    definition_id: number;

    @Column('text',{nullable: true})
    definition: string;

    @OneToOne(
        () => WordManage,
        (word) => word.definition
    )
    @JoinColumn({
        name: "word_id",
        referencedColumnName: "word_id"
    })
    word_id: WordManage;
}