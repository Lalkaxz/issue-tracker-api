import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { IssueEntity } from 'src/modules/issues/entities/issue.entity';

export const Issue = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<IssueEntity> => {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.prisma) {
      throw new InternalServerErrorException(
        `'PrismaService' not provided in Request`
      );
    }
    const prismaService: PrismaService = request.prisma;
    const issueId = request.params.issueId;
    if (!issueId) {
      throw new InternalServerErrorException(
        `Issue ID not provided in the URL.`
      );
    }

    if (!Types.ObjectId.isValid(issueId)) {
      throw new BadRequestException('Invalid issueId');
    }

    const issue = await prismaService.issue.findUnique({
      where: { id: issueId }
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }
);
