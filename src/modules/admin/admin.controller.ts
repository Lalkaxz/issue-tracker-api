import {
  ADMIN_CONTROLLER,
  ADMIN_ROUTES,
  CommentDto,
  IssueDto
} from '@app/contract';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Authorization } from 'src/common/decorators/auth.decorator';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { User } from 'src/common/decorators/users.decorator';
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { Role } from 'src/common/roles/enums/role.enum';
import { AdminOnly, Roles } from 'src/common/roles/roles.decorator';

import { DeactivateUserDto } from '../users/dto/deactivate-user.dto';
import { DeleteUserDto } from '../users/dto/delete-user.dto';
import { UpdateUserRoleDto } from '../users/dto/update-user.dto';
import { UserEntity } from '../users/entities/user.entity';

import { AdminService } from './admin.service';

@Authorization()
@AdminOnly()
@Roles([Role.Admin])
@ApiBearerAuth()
@ApiTags('admin')
@ApiDefaultResponses()
@Controller(ADMIN_CONTROLLER)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Return array of all users' })
  @Get(ADMIN_ROUTES.GET_ALL_USERS)
  findAllUsers() {
    return this.adminService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get all issues' })
  @ApiOkResponse({ description: 'Return array of all issues' })
  @Get(ADMIN_ROUTES.GET_ALL_ISSUES)
  findAllIssues(): Promise<IssueDto[]> {
    return this.adminService.getAllIssues();
  }

  @ApiOperation({ summary: 'Get all issue comments' })
  @ApiOkResponse({ description: 'Return array of all comments' })
  @Get(ADMIN_ROUTES.GET_ALL_COMMENTS)
  findAllComments(): Promise<CommentDto[]> {
    return this.adminService.getAllComments();
  }

  @ApiOperation({ summary: 'Update array of user roles' })
  @ApiOkResponse({ description: 'Return updated user' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Patch(ADMIN_ROUTES.UPDATE_USER_ROLE)
  updateUserRole(
    @Param('userId', ParseObjectIdPipe) id: string,
    @Body() updateAdminDto: UpdateUserRoleDto
  ) {
    return this.adminService.updateUserRole(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Deactivate user' })
  @ApiOkResponse({ description: 'User deactivated successfully.' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Patch(ADMIN_ROUTES.DEACTIVATE_USER)
  deactivateUser(
    @Param('userId', ParseObjectIdPipe) id: string,
    @Body() deactivateUserDto: DeactivateUserDto
  ) {
    return this.adminService.deactivateUser(
      id,
      deactivateUserDto.isDeactivated
    );
  }

  @ApiOperation({ summary: 'Deactivate user' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Delete(ADMIN_ROUTES.DELETE_USER)
  removeUser(
    @Param('userId', ParseObjectIdPipe) id: string,
    @User() user: UserEntity,
    @Body() deleteUserDto: DeleteUserDto
  ) {
    return this.adminService.deleteUser(id, user, deleteUserDto);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiOkResponse({ description: 'Project deleted successfully.' })
  @Delete(ADMIN_ROUTES.DELETE_PROJECT)
  removeProject(@Param('projectId', ParseObjectIdPipe) id: string) {
    return this.adminService.deleteProject(id);
  }

  @ApiOperation({ summary: 'Delete issue' })
  @ApiOkResponse({ description: 'Issue deleted successfully.' })
  @Delete(ADMIN_ROUTES.DELETE_ISSUE)
  removeIssue(@Param('issueId', ParseObjectIdPipe) id: string) {
    return this.adminService.deleteIssue(id);
  }

  @ApiOperation({ summary: 'Delete issue comment' })
  @ApiOkResponse({ description: 'Comment deleted successfully.' })
  @Delete(ADMIN_ROUTES.DELETE_COMMENT)
  removeComment(@Param('commentId', ParseObjectIdPipe) id: string) {
    return this.adminService.deleteComment(id);
  }
}
