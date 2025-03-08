import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Comment, Issue, Prisma, User } from '@prisma/client';
import { validatePasswords } from 'src/common/utils/compare-passwords.util';
import { PrismaService } from 'src/core/prisma/prisma.service';

import { DeleteUserDto } from '../users/dto/delete-user.dto';
import { UpdateUserRoleDto } from '../users/dto/update-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CommentsGateway } from '../websocket/comments.gateway';
import { IssuesGateway } from '../websocket/issues.gateway';
import { ProjectsGateway } from '../websocket/projects.gateway';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly issuesGateway: IssuesGateway,
    private readonly commentsGateway: CommentsGateway,
    private readonly projectGateway: ProjectsGateway
  ) {}

  /* Get functions for resources. Without serialization. With credentials. */
  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getAllIssues(): Promise<Issue[]> {
    return await this.prismaService.issue.findMany();
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.prismaService.comment.findMany();
  }

  // Change array in 'roles' field in database document.
  async updateUserRole(id: string, roleDto: UpdateUserRoleDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        roles: roleDto.roles
      }
    });
  }

  // Change value in 'isDeactivated' field in database document. Set current Date to 'deactivatedAt' if isDeactivated is true.
  async deactivateUser(id: string, isDeactivated: boolean): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const deactivateUserData: Prisma.UserUpdateInput = {
      isDeactivated: isDeactivated
    };

    if (isDeactivated) {
      if (!user.deactivatedAt) {
        deactivateUserData.deactivatedAt = new Date(); // Set current time if 'deactivatedAt' is null.
      }
    } else {
      // If 'isDeactivated' is false, set null.
      deactivateUserData.deactivatedAt = null;
    }

    return await this.prismaService.user.update({
      where: { id },
      data: deactivateUserData
    });
  }

  // Delete user document in database by id. Return boolean value.
  async deleteUser(id: string, user: UserEntity, deleteUserDto: DeleteUserDto) {
    const match = await validatePasswords(
      deleteUserDto.password,
      user.password
    );
    if (!match) {
      throw new BadRequestException('Incorrect password');
    }

    if (user.id === id) {
      throw new ForbiddenException(`You cant delete yourself`);
    }

    const succesfully = await this.prismaService.user.delete({
      where: { id }
    });
    if (!succesfully) {
      throw new InternalServerErrorException('Delete user failed');
    }

    return { message: 'User deleted succesfully' };
  }

  async deleteProject(id: string) {
    const deletedProject = await this.prismaService.project.delete({
      where: { id }
    });

    this.projectGateway.emitProjectDeleted(deletedProject);

    return { message: 'Project deleted succesfully' };
  }

  async deleteIssue(id: string) {
    const deletedIssue = await this.prismaService.issue.delete({
      where: { id }
    });

    this.issuesGateway.emitIssueDeleted(deletedIssue);

    return { message: 'Issue deleted succesfully' };
  }

  async deleteComment(id: string) {
    const deletedComment = await this.prismaService.comment.delete({
      where: { id }
    });

    this.commentsGateway.emitCommentDeleted(deletedComment);

    return { message: 'Issue comment deleted succesfully' };
  }
}
