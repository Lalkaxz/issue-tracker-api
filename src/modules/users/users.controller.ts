import { Controller, Get, Param, Delete, UseGuards, Req, Query, ParseArrayPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/enums/role.enum';
import { User } from '../../common/decorators/users.decorator';
import { UserEntity } from './entities/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, ForbiddenResponseDto, InternalServerErrorResponseDto, NotFoundResponseDto, UnauthorizdResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { Expand } from '../../common/enums/users.enum';
import { ExpandValidationPipe } from 'src/common/pipes/enum.pipe';
import { USERS_CONTROLLER, USERS_ROUTES } from '@app/contract';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('users')
@Controller(USERS_CONTROLLER)
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
  @Get(USERS_ROUTES.ME)
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
  @Get(USERS_ROUTES.GET_BY_NAME)
  getProfile(@Param('name') name: string,
             @Query('expand', new ExpandValidationPipe(Expand)) expand?: Expand[]
  ) {
    return this.usersService.getUserProfile(name, expand);
  }
}