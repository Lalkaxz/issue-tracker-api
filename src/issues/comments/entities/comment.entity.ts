import { Issue } from "src/issues/entities/issue.entity";
import { User } from "src/users/entities/user.entity";

export class Comment {
    readonly id: string;
    readonly text: string;
    readonly issueId: string;
    readonly issue: Issue;
    readonly authorId: string;
    readonly author: User;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
