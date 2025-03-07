import { Prisma } from '@prisma/client'

import { authorSelectOptions } from '../users/users.query'

export const commentsIncludeOptions: Prisma.CommentInclude = {
	author: {
		select: authorSelectOptions
	}
}
