import { Issue, User } from "@prisma/client";

export class CommentEntity {
    readonly id: string;
    readonly text: string;
    readonly issueId: string;
    readonly issue: Issue;
    readonly authorName: string;
    readonly author: User;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}