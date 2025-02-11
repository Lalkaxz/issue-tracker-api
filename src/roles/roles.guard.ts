import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from './roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from './enums/role.enum';

/** Guard to check role permission for route call. */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        // Get roles from metadata and resolve request if roles is empty.
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!roles || roles.length === 0) {
            return true;
        }
        // Get user roles from request.
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        if (!user) {
            throw new InternalServerErrorException();
        }
        // Compare allowed roles and user roles, resolve request if user has allowed roles.
        return roles.some((role) => user.roles.includes(role));
    }
    
}