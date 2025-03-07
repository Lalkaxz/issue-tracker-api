import { UserProfileDto } from '@app/contract'
import { USERS_CONTROLLER, USERS_ROUTES } from '@app/contract'
import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	Post,
	SerializeOptions,
	UseInterceptors
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { Authorization } from 'src/common/decorators/auth.decorator'
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator'
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto'
import { Role } from 'src/common/roles/enums/role.enum'
import { Roles } from 'src/common/roles/roles.decorator'

import { User } from '../../common/decorators/users.decorator'

import { UpdateDisplayNameDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Authorization()
@Roles([Role.User])
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('users')
@ApiDefaultResponses()
@Controller(USERS_CONTROLLER)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@SerializeOptions({ type: UserProfileDto })
	@ApiOperation({ summary: 'Return current user profile' })
	@ApiOkResponse({ type: UserProfileDto, description: 'Return user profile' })
	@Get(USERS_ROUTES.ME)
	aboutMe(@User() user: UserEntity): Promise<UserProfileDto> {
		return this.usersService.getUserProfile(user.name)
	}

	@SerializeOptions({ type: UserProfileDto })
	@ApiOperation({ summary: 'Return user profile by name' })
	@ApiOkResponse({ type: UserProfileDto, description: 'Return user profile' })
	@ApiNotFoundResponse({
		type: NotFoundResponseDto,
		description: 'Not found'
	})
	@Get(USERS_ROUTES.GET_BY_NAME)
	getProfile(@Param('name') name: string): Promise<UserProfileDto> {
		return this.usersService.getUserProfile(name)
	}

	@Post(USERS_ROUTES.UPDATE_PROFILE)
	updateProfile(
		@Body() updateDto: UpdateDisplayNameDto,
		@User() user: UserEntity
	) {
		return this.usersService.updateUserDisplayName(updateDto, user)
	}
}
