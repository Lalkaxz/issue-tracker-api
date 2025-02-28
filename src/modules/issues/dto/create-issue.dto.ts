import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsIn, IsOptional, Length } from "class-validator";

export class CreateIssueDto {
    @ApiProperty({
        type: String,
        description: "Issue title, min 3 symbols, max 100 symbols.",
        example: "Bug: Fix incorrect timestamp of Comment Creation Date."
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    readonly title: string;

    @ApiProperty({
        type: String,
        description: "Issue description, min 10 symbols, max 350 symbols.",
        example: `The creation date of comments is displayed incorrectly. Instead of showing the actual timestamp, it sometimes appears as 'Invalid Date'.`
    })
    @IsNotEmpty()
    @IsString()
    @Length(10, 350)
    readonly description: string;

    @ApiProperty({
        type: String,
        description: "Issue status.",
        example: `'open' or 'in-progress' or 'closed'`
    })
    @IsString()
    @IsOptional()
    @IsIn(['open', 'in-progress', 'closed'])
    readonly status: string;
}
