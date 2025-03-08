import { AUTH_CONTROLLER, AUTH_ROUTES } from '@app/contract';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Authorization } from 'src/common/decorators/auth.decorator';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { User } from 'src/common/decorators/users.decorator';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto
} from 'src/common/exceptions/dto/error-response.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user and return token' })
  @ApiCreatedResponse({
    type: TokenResponseDto,
    description: 'Return authorization token'
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponseDto,
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: 'Internal server error'
  })
  @ApiBody({ type: CreateUserDto })
  @Post(AUTH_ROUTES.CREATE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Validate data and return user token' })
  @ApiCreatedResponse({
    type: TokenResponseDto,
    description: 'Return authorization token'
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponseDto,
    description: 'Bad request'
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: 'Internal server error'
  })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.OK)
  @Post(AUTH_ROUTES.LOGIN)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Authorization()
  @ApiOperation({ summary: 'Refresh and return new user token' })
  @ApiDefaultResponses()
  @ApiBody({ type: RefreshTokenDto })
  @HttpCode(HttpStatus.OK)
  @Post(AUTH_ROUTES.REFRESH)
  refresh(@Body() refreshTokenDto: RefreshTokenDto, @User() user: UserEntity) {
    return this.authService.refresh(refreshTokenDto, user);
  }
}
