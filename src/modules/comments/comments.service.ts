import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { IssueEntity } from '../issues/entities/issue.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(commentDto: CreateCommentDto, issue: IssueEntity, user: UserEntity) {
    return await this.prismaService.comment.create({data: {
      text: commentDto.text,
      issueId: issue.id,
      authorName: user.name
    }});
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
