import { ApiProperty } from "@nestjs/swagger";
import { Comment, Issue } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserProfileDto {
    @ApiProperty({
        type: String,
        description: "Unique id"
    })
    @Expose() readonly id: string;

    @ApiProperty({
        type: String,
        description: "User name"
    })
    @Expose() readonly name: string;

    @ApiProperty({
        type: [String],
        description: "User roles"
    })
    @Expose() readonly roles: string[]

    @ApiProperty({
        default: [],
        description: "User comments"
    })
    @Expose() readonly comments?: Comment[]

    @ApiProperty({
        default: [],
        description: "User issues"
    })
    @Expose() readonly issues?: Issue[]

    @ApiProperty({
        type: Date,
        description: "User creation date",
        example: "2025-02-26T12:00:00.000Z"
    })
    @Expose() readonly createdAt: Date;
}