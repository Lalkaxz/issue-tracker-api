import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Issue } from '@prisma/client';
import { issuesIncludeOptions } from '@app/contract';

@Injectable()
export class IssuesService {
  constructor(private readonly prismaService: PrismaService) {}
 
  // Create new issue document in database and return it.
  async create(issueDto: CreateIssueDto, user: UserEntity): Promise<Issue> {
    const issue = await this.prismaService.issue.create({data: {
      title: issueDto.title,
      description: issueDto.description,
      status: issueDto.status,
      authorId: user.id,
    }});

    return issue;
  }

  // Return array of issues. Supports limit items.
  async findAll(limit?: number): Promise<Issue[]> {
    const issues = await this.prismaService.issue.findMany({ take: limit });
    return issues;
  }

  // Return issue by id with author and comments. Throw error if it does not exists.
  async findOne(id: string): Promise<Issue | null> { 
    const issue = await this.prismaService.issue.findFirst({
      where: {id},
      include: issuesIncludeOptions
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }
    return issue;
  }

  // Update issue data. Only for issue author.
  async update(id: string,
               user: UserEntity,
               updateIssueDto: UpdateIssueDto
    ): Promise<Issue> {

    const issue = await this.prismaService.issue.findFirst({where: {id: id}});
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    if (user.id !== issue.authorId) {
      throw new ForbiddenException('Only author can update issue');
    }

    const updatedIssue = this.prismaService.issue.update({
      where: {id},
      data: updateIssueDto
    });
    return updatedIssue;
  }

  // Delete issue. Only for issue author.
  async delete(id: string, user: UserEntity) {
    
    const issue = await this.prismaService.issue.findFirst({where: {id: id}});
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    if (user.id !== issue.authorId) {
      throw new ForbiddenException('Only author can delete issue');
    }

    await this.prismaService.issue.delete({
      where: {id}
    });
    return { message: 'Issue deleted successfully' };
    
  }
}
