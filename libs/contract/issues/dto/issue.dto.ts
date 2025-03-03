import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { UserProfileDto } from "libs/contract/users/dto/user-profile.dto";

@Exclude()
export class IssueDto {
    @ApiProperty({ example: "60c72b2f5f1b2c6d88f8a5b4", description: "Unique issue id" })
    @Expose() readonly id: string;
  
    @ApiProperty({ example: "Bug in authentication", description: "Issue title" })
    @Expose() readonly title: string;
  
    @ApiProperty({ example: "User cannot log in with valid credentials", description: "Issue description" })
    @Expose() readonly description: string;
  
    @ApiProperty({ example: "open", description: "Status of the issue", enum: ["open", "in-progress", "closed"] })
    @Expose() readonly status: string;
    
    @ApiProperty({ example: "67bf22e2e27481030b2053dd", description: "Author unique id"})
    @Expose() readonly authorId: string;

    @ApiProperty({ description: "Issue author", default: {} })
    @Expose() readonly author?: UserProfileDto;
  
    @ApiProperty({ description: "Issue comments", default: [] })
    @Expose() readonly comments?: Comment[];
  
    @ApiProperty({ example: "2025-02-26T12:00:00.000Z", description: "Date when the issue was created" })
    @Expose() readonly createdAt: Date;
  
    @ApiProperty({ example: "2025-02-26T12:30:00.000Z", description: "Date when the issue was last updated" })
    @Expose() readonly updatedAt: Date;
  }