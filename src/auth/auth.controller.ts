import { Controller, Get, Post, Body, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { ErrorResponseDto } from 'src/exceptions/dto/error-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Create new user and return token" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto})
  @ApiResponse({ status: HttpStatus.CREATED, type: TokenResponseDto, description: "Returning authorization token"})
  @ApiInternalServerErrorResponse()
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
