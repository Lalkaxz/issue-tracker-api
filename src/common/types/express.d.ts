import { PrismaService } from 'src/core/prisma/prisma.service'
import { UserEntity } from 'src/modules/users/entities/user.entity'

declare module 'express' {
	interface Request {
		user?: UserEntity
		prisma?: PrismaService
	}
}
