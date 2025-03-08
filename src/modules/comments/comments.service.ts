import { CommentDto } from '@app/contract';
import { commentsIncludeOptions } from '@app/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Comment } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/core/prisma/prisma.service';

import { IssueEntity } from '../issues/entities/issue.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CommentsGateway } from '../websocket/comments.gateway';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commentsGateway: CommentsGateway,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // Create new issue comment document and return it.
  async create(
    commentDto: CreateCommentDto,
    issue: IssueEntity,
    user: UserEntity
  ) {
    const comment = await this.prismaService.comment.create({
      data: {
        text: commentDto.text,
        issueId: issue.id,
        authorId: user.id
      }
    });

    this.commentsGateway.emitCommentCreated(comment);
    await this.cacheManager.del('comments');

    return comment;
  }

  // Return array of issue comments. Supports limit items.
  async findAll(issueId: string, limit?: number): Promise<CommentDto[]> {
    const cachedComments = await this.cacheManager.get<Comment[]>('comments');
    if (cachedComments) {
      return cachedComments;
    }

    const comments = await this.prismaService.comment.findMany({
      where: { issueId },
      take: limit
    });
    await this.cacheManager.set('comments', comments);

    return comments;
  }

  // Return issue comment by id with author. Throw error if it does not exists.
  async findOne(id: string): Promise<CommentDto> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
      include: commentsIncludeOptions
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  // Update issue comment text. Only for comment author.
  async update(
    id: string,
    user: UserEntity,
    updateCommentDto: UpdateCommentDto
  ): Promise<CommentDto> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id }
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (user.id !== comment.authorId) {
      throw new ForbiddenException('Only author can update comment');
    }

    const updatedComment = await this.prismaService.comment.update({
      where: { id },
      data: updateCommentDto
    });

    this.commentsGateway.emitCommentUpdated(updatedComment);
    await this.cacheManager.del('comments');

    return updatedComment;
  }

  // Delete issue comment. Only for comment author
  async remove(id: string, user: UserEntity) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id }
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (user.id !== comment.authorId) {
      throw new ForbiddenException('Only author can delete comment');
    }

    const deletedComment = await this.prismaService.comment.delete({
      where: { id }
    });

    this.commentsGateway.emitCommentDeleted(deletedComment);
    await this.cacheManager.del('comments');

    return { message: 'Issue comment deleted successfully' };
  }
}
