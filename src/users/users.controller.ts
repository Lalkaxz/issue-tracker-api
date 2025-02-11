import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


}
