import { Issue, Comment } from "@prisma/client";

export class UserEntity {
    readonly id: string;
    readonly name: string;
    readonly password: string;
    readonly roles: string[];
    readonly token: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly issues?: Issue[];
    readonly comments?: Comment[];
}
