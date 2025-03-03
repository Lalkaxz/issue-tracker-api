import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: "User name, min 3 symbols, max 20 symbols",
        example: "John",
        minLength: 3,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Name must not contain spaces or special characters. Only: a-z; A-Z; 0-9; _' })
    readonly name: string;

    @ApiProperty({
        type: String,
        description: "User password, min 8 symbols, max 36 symbols",
        example: "John23781",
        minLength: 8,
        maxLength: 36
    })
    @IsString()
    @IsNotEmpty()
    @Length(8, 36)
    readonly password: string;
}
