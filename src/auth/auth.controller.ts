import { Controller, Get, Post, Body, Param, Delete, HttpStatus, InternalServerErrorException, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { BadRequestErrorResponseDto, InternalServerErrorResponseDto  } from 'src/exceptions/dto/error-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Create new user and return token" })
  @ApiCreatedResponse({ type: TokenResponseDto, description: "Return authorization token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  registation(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  
  @ApiOperation({ summary: "Validate data and return user token"})
  @ApiCreatedResponse({ type: TokenResponseDto, description: "Return authorization token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(200)
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
  

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Refresh and return new user token" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiInternalServerErrorResponse({type: InternalServerErrorResponseDto, description: "Internal server error" })
  @ApiBody({ type: RefreshTokenDto })
  @HttpCode(200)
  @Post('/refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto,
          @User() user: UserEntity) {
    return this.authService.refresh(refreshTokenDto, user);
  }

}
