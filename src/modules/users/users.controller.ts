import { Controller, Get, Param, UseGuards, ClassSerializerInterceptor, UseInterceptors, SerializeOptions, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/enums/role.enum';
import { User } from '../../common/decorators/users.decorator';
import { UserEntity } from './entities/user.entity';
import { UserProfileDto } from '@app/contract';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { USERS_CONTROLLER, USERS_ROUTES } from '@app/contract';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { UpdateDisplayNameDto } from './dto/update-user.dto';


@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('users')
@ApiDefaultResponses()
@Controller(USERS_CONTROLLER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({ type: UserProfileDto })
  @ApiOperation({ summary: "Return current user profile"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @Get(USERS_ROUTES.ME)
  aboutMe(@User() user: UserEntity,): Promise<UserProfileDto> {
    return this.usersService.getUserProfile(user.name)
  }


  @SerializeOptions({ type: UserProfileDto })
  @ApiOperation({ summary: "Return user profile by name"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return user profile" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Get(USERS_ROUTES.GET_BY_NAME)
  getProfile(@Param('name') name: string,): Promise<UserProfileDto> {
    return this.usersService.getUserProfile(name);
  }

  @Post(USERS_ROUTES.UPDATE_PROFILE)
  updateProfile(@Body() updateDto: UpdateDisplayNameDto,
                @User() user: UserEntity    
  ) {
    return this.usersService.updateUserDisplayName(updateDto, user);
  }
}
