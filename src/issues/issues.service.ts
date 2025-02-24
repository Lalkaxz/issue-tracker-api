import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Issue } from '@prisma/client';

@Injectable()
export class IssuesService {
  constructor(private readonly prismaService: PrismaService) {}
 
  async create(issueDto: CreateIssueDto, user: UserEntity): Promise<Issue> {
    const issue = await this.prismaService.issue.create({data: {
      title: issueDto.title,
      description: issueDto.description,
      status: issueDto.status,
      authorId: user.id,
    }});

    return issue;
  }

  async findAll(): Promise<Issue[]> {
    const issues = await this.prismaService.issue.findMany();
    return issues;
  }

  async findOne(id: string): Promise<Issue | null> { 
    const issue = await this.prismaService.issue.findFirst({where: {id}});
    return issue;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }
}
