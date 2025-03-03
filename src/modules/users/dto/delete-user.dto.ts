import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class DeleteUserDto {
    @ApiProperty({
        type: String,
        description: "Target user unique id",
        example: "60c72b2f5f1b2c6d88f8a5b4",
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

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