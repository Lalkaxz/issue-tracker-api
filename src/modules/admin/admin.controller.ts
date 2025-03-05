import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ADMIN_CONTROLLER, ADMIN_ROUTES, CommentDto, IssueDto } from '@app/contract';
import { Role } from 'src/common/roles/enums/role.enum';
import { AdminOnly, Roles } from 'src/common/roles/roles.decorator';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { UpdateUserRoleDto } from '../users/dto/update-user.dto';
import { DeactivateUserDto } from '../users/dto/deactivate-user.dto';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { DeleteUserDto } from '../users/dto/delete-user.dto';
import { Authorization } from 'src/common/decorators/auth.decorator';


@Authorization()
@AdminOnly()
@Roles([Role.Admin])
@ApiBearerAuth()
@ApiTags('admin')
@Controller(ADMIN_CONTROLLER)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Get(ADMIN_ROUTES.GET_ALL_USERS)
  findAllUsers() {
    return this.adminService.getAllUsers();
  }


  @Get(ADMIN_ROUTES.GET_ALL_ISSUES)
  findAllIssues(): Promise<IssueDto[]> {
    return this.adminService.getAllIssues();
  }


  @Get(ADMIN_ROUTES.GET_ALL_COMMENTS)
  findAllComments(): Promise<CommentDto[]> {
    return this.adminService.getAllComments();
  }


  @Patch(ADMIN_ROUTES.UPDATE_USER_ROLE)
  updateUserRole(@Param('id', ParseObjectIdPipe) id: string,
                 @Body() updateAdminDto: UpdateUserRoleDto
    ) {
    return this.adminService.updateUserRole(id, updateAdminDto);
  }


  @Patch(ADMIN_ROUTES.DEACTIVATE_USER)
  deactivateUser(@Param('id', ParseObjectIdPipe) id: string,
                 @Body() deactivateUserDto: DeactivateUserDto
  ) {
    return this.adminService.deactivateUser(id, deactivateUserDto.isDeactivated);
  }


  @Delete(ADMIN_ROUTES.DELETE_USER)
  removeUser(@Param('id', ParseObjectIdPipe) id: string,
             @User() user: UserEntity,
             @Body() deleteUserDto: DeleteUserDto
  ) {
    return this.adminService.deleteUser(id, user, deleteUserDto);
  }

  @Delete(ADMIN_ROUTES.DELETE_ISSUE)
  removeIssue(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.deleteIssue(id);
  }
  

  @Delete(ADMIN_ROUTES.DELETE_COMMENT)
  removeComment(@Param('id', ParseObjectIdPipe) id: string) {
    return this.adminService.deleteComment(id);
  }

}
