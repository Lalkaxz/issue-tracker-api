import { Prisma } from "@prisma/client";
import { usersProfileSelectOptions } from "../users/users.query";

export const issuesIncludeOptions: Prisma.IssueInclude = {
    comments: true,
    author: {
      select: usersProfileSelectOptions
    }
}