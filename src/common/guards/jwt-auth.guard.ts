import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Role } from '../roles/enums/role.enum';
import { ROLES_KEY } from '../roles/roles.decorator';

/** Guard for user authentication. Cancell route call if user unauthorized. */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly prismaService: PrismaService,
                private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromHeader(request);

        const payload = await this.jwtService.verifyAsync(token)

        if (!payload || !payload['sub']) {
            throw new UnauthorizedException('Invalid token payload');
        }
        const { sub: username } = payload;
        
        // Get user from name and set it to request.
        const user = await this.prismaService.user.findFirst({where: {
            name: username
        }});
        if (!user) {
            throw new UnauthorizedException("User is unauthorized");
        }

        // Check if token from header not current user JWT-token.
        if (token !== user.token) {
            throw new UnauthorizedException('Invalid token');
        }

        if (user.isDeactivated) {
            throw new ForbiddenException('Your account is deactivated');
        }

        request.user = user;

        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!roles || roles.length === 0) {
            return true;
        }

        // Compare allowed roles and user roles, resolve request if user has allowed roles.
        if (!roles.some((role) => user.roles.includes(role))) {
            return false;
        };

        return true;
    }

    // Extract token from request.
    private extractTokenFromHeader(request: Request): string {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            throw new BadRequestException("Missing Authorization header");
        }

        // Get token and type from header value.
        const [type, token] = authorizationHeader.split(" ") ?? [];
        if (type !== "Bearer") {
            throw new UnauthorizedException("Invalid token format. Expected: \'Bearer <token>\'");
        }
        return token;
    }
}