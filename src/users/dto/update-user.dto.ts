import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
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
        description: "New token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    })
    @IsString()
    @IsNotEmpty()
    readonly token: string;
}
