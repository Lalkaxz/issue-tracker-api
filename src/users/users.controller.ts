import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { Request } from 'express';
import { User } from './user.decorator';
import { UserEntity } from './entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  aboutMe(@User() user: UserEntity) {
    return this.usersService.getUserProfile(user.name)
  }


  @Get("/:name")
  getProfile(@Param('name') name: string) {
    return this.usersService.getUserProfile(name);
  }
}
