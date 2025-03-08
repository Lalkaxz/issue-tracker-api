import { Comment, Project, User } from '@prisma/client';

export class IssueEntity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly authorId: string;
  readonly projectId: string;
  readonly project?: Project;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author?: User;
  readonly comments?: Comment[];
}
