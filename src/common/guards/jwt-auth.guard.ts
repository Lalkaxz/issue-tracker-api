import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';

/** Guard for user authentication. Cancell route call if user unauthorized. */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly prismaService: PrismaService
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