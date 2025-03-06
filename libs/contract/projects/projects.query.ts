import { Prisma } from "@prisma/client";
import { authorSelectOptions } from "../users/users.query";

export const projectsIncludeOptions: Prisma.ProjectInclude = {
    issues: true,
    owner: {
      select: authorSelectOptions
    }
}