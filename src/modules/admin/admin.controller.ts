import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ADMIN_CONTROLLER, ADMIN_ROUTES, UserProfileDto } from '@app/contract';
import { Role } from 'src/common/roles/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { UsersService } from '../users/users.service';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { UpdateUserRoleDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.Admin])
@ApiBearerAuth()
@ApiTags('admin')
@Controller({ host: ADMIN_CONTROLLER})
export class AdminController {
  constructor(private readonly adminService: AdminService,
              private readonly usersService: UsersService
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get(ADMIN_ROUTES.GET_ALL_USERS)
  findAll(): Promise<UserProfileDto[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(ADMIN_ROUTES.UPDATE_USER_ROLE)
  updateUserRole(@Param('id', ParseObjectIdPipe) id: string,
                 @Body() updateAdminDto: UpdateUserRoleDto
    ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
