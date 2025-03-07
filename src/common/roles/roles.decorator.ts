import { SetMetadata } from '@nestjs/common'

import { Role } from './enums/role.enum'

export const ROLES_KEY = 'roles' // Key for get allowed roles from metadata.
export const Roles = (roles?: Role[] | string[]) =>
	SetMetadata(ROLES_KEY, roles ?? undefined) // Decorator for set allowed roles for route.
export const AdminOnly = () => Roles([Role.Admin]) // Decorator for set admin route.
