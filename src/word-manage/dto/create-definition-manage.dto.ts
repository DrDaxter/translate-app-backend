import { IsInt, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateDefinitionManageDto{

    @IsString()
    @MinLength(5)
    definition: string;

    @IsNumber()
    @IsInt()
    @Min(1)
    word_id: number;
}