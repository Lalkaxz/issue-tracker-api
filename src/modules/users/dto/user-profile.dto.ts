import { ApiProperty } from "@nestjs/swagger";
import { Comment, Issue } from "@prisma/client";
import { IsNotEmpty, IsString, IsArray } from "class-validator";

export class UserProfileDto {
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
        default: [],
        description: "User comments"
    })
    @IsArray()
    readonly comments?: Comment[]

    @ApiProperty({
        default: [],
        description: "User issues"
    })
    @IsArray()
    readonly issues?: Issue[]


}