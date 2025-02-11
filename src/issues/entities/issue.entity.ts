import { User } from "src/users/entities/user.entity";
import { Comment } from "../comments/entities/comment.entity";

export class Issue {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: string;
    readonly authorId: string;
    readonly author: User;
    readonly comments: Comment[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
