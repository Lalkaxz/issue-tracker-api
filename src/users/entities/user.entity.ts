import { Comment } from "src/issues/comments/entities/comment.entity";
import { Issue } from "src/issues/entities/issue.entity";

export class User {
    readonly id: string;
    readonly name: string;
    readonly password: string;
    readonly roles: string[];
    // readonly issues: Issue[];
    // readonly comments: Comment[];
    readonly token: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
