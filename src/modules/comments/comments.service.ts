import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { IssueEntity } from '../issues/entities/issue.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CommentDto } from '@app/contract';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create new issue comment document and return it.
  async create(commentDto: CreateCommentDto, issue: IssueEntity, user: UserEntity) {
    return await this.prismaService.comment.create({data: {
      text: commentDto.text,
      issueId: issue.id,
      authorName: user.name
    }});
  }

  // Return array of issue comments. Supports limit items.
  async findAll(issueId: string, limit?: number): Promise<CommentDto[]> {
    const comments = await this.prismaService.comment.findMany({
      where: {issueId},
      take: limit
    });
    return comments;
  }

  // Return issue comment by id. Throw error if it does not exists.
  async findOne(id: string): Promise<CommentDto> {
    const comment = await this.prismaService.comment.findUnique({ where: {id} });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    
    return comment;
  }

  // Update issue comment text. Only for comment author.
  async update(id: string, user: UserEntity, updateCommentDto: UpdateCommentDto): Promise<CommentDto> {

    const comment = await this.prismaService.comment.findUnique({where: {id}});
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (user.name !== comment.authorName) {
      throw new ForbiddenException('Only author can update comment');
    }

    const updatedComment = await this.prismaService.comment.update({
      where: {id},
      data: updateCommentDto
    });
    return updatedComment;
  }

  // Delete issue comment. Only for comment author
  async remove(id: string, user: UserEntity) {

    const comment = await this.prismaService.comment.findUnique({where: {id}});
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (user.name !== comment.authorName) {
      throw new ForbiddenException('Only author can delete comment');
    }

    await this.prismaService.comment.delete({
      where: {id}
    });

    return { message: 'Issue comment deleted successfully' };
  }
}
