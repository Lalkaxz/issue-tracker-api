import { Controller, Get, Post, Body, Param, Delete, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { BadRequestErrorResponseDto, InternalServerErrorResponseDto  } from 'src/exceptions/dto/error-response.dto';

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

}
