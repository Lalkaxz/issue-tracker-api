import { Prisma } from '@prisma/client'

import { authorSelectOptions } from '../users/users.query'

export const issuesIncludeOptions: Prisma.IssueInclude = {
	comments: true,
	author: {
		select: authorSelectOptions
	}
}
