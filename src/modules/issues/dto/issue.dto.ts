import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@prisma/client";
import { UserProfileDto } from "src/modules/users/dto/user-profile.dto";

export class IssueDto {
    @ApiProperty({ example: "60c72b2f5f1b2c6d88f8a5b4", description: "Unique issue id" })
    id: string;
  
    @ApiProperty({ example: "Bug in authentication", description: "Issue title" })
    title: string;
  
    @ApiProperty({ example: "User cannot log in with valid credentials", description: "Issue description" })
    description: string;
  
    @ApiProperty({ example: "open", description: "Status of the issue", enum: ["open", "in-progress", "closed"] })
    status: string;
    
    @ApiProperty({ example: "67bf22e2e27481030b2053dd", description: "Name of issue author"})
    authorName: string;

    @ApiProperty({ description: "Issue author", default: {} })
    author?: UserProfileDto;
  
    @ApiProperty({ description: "Issue comments", default: [] })
    comments?: Comment[];
  
    @ApiProperty({ example: "2025-02-26T12:00:00.000Z", description: "Date when the issue was created" })
    createdAt: Date;
  
    @ApiProperty({ example: "2025-02-26T12:30:00.000Z", description: "Date when the issue was last updated" })
    updatedAt: Date;
  }