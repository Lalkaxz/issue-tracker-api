import { Controller, Get, Post, Body, Param, Delete, HttpStatus, InternalServerErrorException, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { BadRequestErrorResponseDto, ForbiddenResponseDto, InternalServerErrorResponseDto  } from 'src/common/exceptions/dto/error-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AUTH_CONTROLLER, AUTH_ROUTES } from '@app/contract';

@ApiBearerAuth()
@ApiTags('auth')
@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Create new user and return token" })
  @ApiCreatedResponse({ type: TokenResponseDto, description: "Return authorization token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: CreateUserDto })
  @Post(AUTH_ROUTES.CREATE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  
  @ApiOperation({ summary: "Validate data and return user token"})
  @ApiCreatedResponse({ type: TokenResponseDto, description: "Return authorization token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(200)
  @Post(AUTH_ROUTES.LOGIN)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
  

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Refresh and return new user token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: RefreshTokenDto })
  @HttpCode(200)
  @Post(AUTH_ROUTES.REFRESH)
  refresh(@Body() refreshTokenDto: RefreshTokenDto,
          @User() user: UserEntity) {
    return this.authService.refresh(refreshTokenDto, user);
  }

}
