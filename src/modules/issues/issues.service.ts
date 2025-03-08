import { issuesIncludeOptions } from '@app/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Issue } from '@prisma/client';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import { IssuesGateway } from '../websocket/issues.gateway';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly issuesGateway: IssuesGateway,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  // Create new issue document in database and return it.
  async create(
    issueDto: CreateIssueDto,
    user: UserEntity,
    projectId: string
  ): Promise<Issue> {
    const issue = await this.prismaService.issue.create({
      data: {
        title: issueDto.title,
        description: issueDto.description,
        status: issueDto.status,
        projectId: projectId,
        authorId: user.id
      }
    });

    this.issuesGateway.emitIssueCreated(issue);
    await this.cacheManager.del('issues');

    return issue;
  }

  // Return array of issues. Supports limit items.
  async findAll(projectId: string, limit?: number): Promise<Issue[]> {
    const cachedIssues = await this.cacheManager.get<Issue[]>('issues');
    if (cachedIssues) {
      return cachedIssues;
    }

    const issues = await this.prismaService.issue.findMany({
      where: { projectId },
      take: limit
    });
    await this.cacheManager.set('issues', issues);

    return issues;
  }

  // Return issue by id with author and comments. Throw error if it does not exists.
  async findOne(id: string): Promise<Issue | null> {
    const issue = await this.prismaService.issue.findFirst({
      where: { id },
      include: issuesIncludeOptions
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }
    return issue;
  }

  // Update issue data. Only for issue author.
  async update(
    id: string,
    user: UserEntity,
    updateIssueDto: UpdateIssueDto
  ): Promise<Issue> {
    const issue = await this.prismaService.issue.findFirst({
      where: { id: id }
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    if (user.id !== issue.authorId) {
      throw new ForbiddenException('Only author can update issue');
    }

    const updatedIssue = await this.prismaService.issue.update({
      where: { id },
      data: updateIssueDto
    });

    this.issuesGateway.emitIssueUpdated(updatedIssue);
    await this.cacheManager.del('issues');

    return updatedIssue;
  }

  // Delete issue. Only for issue author.
  async delete(id: string, user: UserEntity) {
    const issue = await this.prismaService.issue.findFirst({
      where: { id: id }
    });
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    if (user.id !== issue.authorId) {
      throw new ForbiddenException('Only author can delete issue');
    }

    const deletedIssue = await this.prismaService.issue.delete({
      where: { id }
    });

    this.issuesGateway.emitIssueDeleted(deletedIssue);
    await this.cacheManager.del('issues');

    return { message: 'Issue deleted successfully' };
  }
}
