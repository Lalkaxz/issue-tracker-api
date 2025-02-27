import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Issue } from '@prisma/client';

@Injectable()
export class IssuesService {
  constructor(private readonly prismaService: PrismaService) {}
 
  async create(issueDto: CreateIssueDto, user: UserEntity): Promise<Issue> {
    const issue = await this.prismaService.issue.create({data: {
      title: issueDto.title,
      description: issueDto.description,
      status: issueDto.status,
      authorName: user.name,
    }});

    return issue;
  }

  async findAll(limit?: number): Promise<Issue[]> {
    const issues = await this.prismaService.issue.findMany({ take: limit });
    return issues;
  }

  async findOne(id: string): Promise<Issue | null> { 
    const issue = await this.prismaService.issue.findFirst({
      where: {id},
      include: {
        comments: true,
        author: {
          select: {
            id: true,
            name: true,
            roles: true,
            createdAt: true
          }
        }
      }
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }
    return issue;
  }

  async update(id: string,
               user: UserEntity,
               updateIssueDto: UpdateIssueDto
    ): Promise<Issue> {

    const issue = await this.prismaService.issue.findFirst({where: {id: id}});
    if (!issue) {
      throw new BadRequestException('Issue not found');
    }

    if (user.name !== issue.authorName) {
      throw new ForbiddenException('Only author can delete issue')
    }

    const updatedIssue = this.prismaService.issue.update({
      where: {
        id: id
      },
      data: updateIssueDto
    });
    return updatedIssue;
  }

  async delete(id: string, user: UserEntity) {
    
    const issue = await this.prismaService.issue.findFirst({where: {id: id}});
    if (!issue) {
      throw new BadRequestException('Issue not found');
    }

    if (user.name !== issue.authorName) {
      throw new ForbiddenException('Only author can delete issue')
    }

    await this.prismaService.issue.delete({
      where: {
        id: id
      }
    })
    return { message: 'Issue deleted successfully' };
    
  }
}
