import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateTokenDto {
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


export class UpdateDisplayNameDto {
    @ApiProperty({
        type: String,
        description: "User display name",
        example: "John Smith",
        minLength: 3,
        maxLength: 30
    })
    @Length(3, 30)
    @IsString()
    @IsNotEmpty()
    readonly displayName: string;
}
