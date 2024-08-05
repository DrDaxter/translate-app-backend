import { IsInt, IsNumber, IsPositive, IsString, Max, Min, MinLength } from "class-validator";

export class CreateWordManageDto {
    @IsString()
    @MinLength(2)
    word: string;

    @IsNumber()
    @IsInt()
    @Min(0)
    @Max(1)
    exist_definition:number;

    @IsString()
    @MinLength(5)
    definition: string;
}
