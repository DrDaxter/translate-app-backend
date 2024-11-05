import { IsBoolean, IsString, MinLength } from "class-validator";

export class CreateBookManageDto {
    @IsString()
    @MinLength(2)
    book_name: string;

    @IsBoolean()
    state: boolean;
}
