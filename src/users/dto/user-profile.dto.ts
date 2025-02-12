import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray } from "class-validator";

export class UserProfile {
    @ApiProperty({
        type: String,
        description: "Unique id"
    })
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiProperty({
        type: String,
        description: "User name"
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        type: [String],
        description: "User roles"
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly roles: string[]

    @ApiProperty({
        type: [String],
        description: "User comments"
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly comments: string[]

}