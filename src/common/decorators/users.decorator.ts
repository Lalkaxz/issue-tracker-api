import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException
} from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new InternalServerErrorException(`'User' not provided in Request.`);
    }
    return request.user;
  }
);
