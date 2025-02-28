import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: "User name",
        example: "John"
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        type: String,
        description: "Hash of password",
        example: "John23781"
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
