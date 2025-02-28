import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({ type: String, example: "John23831" })
    @IsString()
    @IsNotEmpty()
    readonly password: string
}