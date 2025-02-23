import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { Request } from 'express';
import { User } from './user.decorator';
import { UserEntity } from './entities/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, InternalServerErrorResponseDto, NotFoundResponseDto, UnauthorizdResponseDto } from 'src/exceptions/dto/error-response.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Return current user profile"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Get("/me")
  aboutMe(@User() user: UserEntity) {
    return this.usersService.getUserProfile(user.name)
  }


  @ApiOperation({ summary: "Return user profile by name"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Get("/:name")
  getProfile(@Param('name') name: string) {
    return this.usersService.getUserProfile(name);
  }
}