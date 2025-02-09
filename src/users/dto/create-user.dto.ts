import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: "User name"
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        type: String,
        description: "Hash of password"
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
