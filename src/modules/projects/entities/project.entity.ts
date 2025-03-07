import { Issue, User } from '@prisma/client'

export class ProjectEntity {
	readonly id: string
	readonly name: string
	readonly description: string | null
	readonly repoUrl: string
	readonly ownerId: string
	readonly owner?: User
	readonly issues?: Issue[]
	readonly createdAt: Date
	readonly updatedAt: Date
}
