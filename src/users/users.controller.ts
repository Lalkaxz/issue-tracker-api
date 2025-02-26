import { Controller, Get, Param, Delete, UseGuards, Req, Query, ParseArrayPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { Request } from 'express';
import { User } from './users.decorator';
import { UserEntity } from './entities/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, ForbiddenResponseDto, InternalServerErrorResponseDto, NotFoundResponseDto, UnauthorizdResponseDto } from 'src/exceptions/dto/error-response.dto';
import { Expand } from './users.enum';
import { ExpandValidationPipe } from 'src/pipes/enum.pipe';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Return current user profile"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiQuery({ name: 'expand', enum: Expand, isArray: true, required: false, type: String})
  @Get("/me")
  aboutMe(@User() user: UserEntity,
          @Query('expand', new ExpandValidationPipe(Expand)) expand?: Expand[]
  ) {
    return this.usersService.getUserProfile(user.name, expand)
  }


  @ApiOperation({ summary: "Return user profile by name"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiQuery({ name: 'expand', enum: Expand, isArray: true, required: false, type: String})
  @Get("/:name")
  getProfile(@Param('name') name: string,
             @Query('expand', new ExpandValidationPipe(Expand)) expand?: Expand[]
  ) {
    return this.usersService.getUserProfile(name, expand);
  }
}