import { Comment, Issue, Project } from '@prisma/client';

export type UserEntity = {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly password: string;
  readonly roles: string[];
  readonly token: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly issues?: Issue[];
  readonly comments?: Comment[];
  readonly projects?: Project[];
  readonly isDeactivated: boolean;
  readonly deactivatedAt: Date | null;
};
