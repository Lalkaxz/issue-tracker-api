import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Role } from './enums/role.enum';
import { Request } from 'express';

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
        const request = context.switchToHttp().getRequest<Request>();
        const user: UserEntity = request.user;
        if (!user) {
            throw new InternalServerErrorException();
        }
        // Compare allowed roles and user roles, resolve request if user has allowed roles.
        return roles.some((role) => user.roles.includes(role));
    }
    
}