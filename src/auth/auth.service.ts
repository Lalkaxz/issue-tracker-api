import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { UserDbDto } from 'src/users/dto/user-db.dto';
import { TokenResponseDto } from './dto/token-response.dto';

const SALT_LENGTH = 5;

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly usersService: UsersService) {}

  // Create user. Create user in database and return token.
  async create(userDto: CreateUserDto): Promise<TokenResponseDto> {
    // Check if user already registered.
    const exists = await this.usersService.findUserByName(userDto.name);
    if (exists) {
      throw new BadRequestException("User already registered");
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    const token = await this.generateToken(userDto);

    // Dto for create user in database.
    const userDbDto: UserDbDto = {
      name: userDto.name,
      password: hashedPassword,
      token: token
    }

    const user = await this.usersService.create(userDbDto)
    if (!user) {
      throw new InternalServerErrorException();
    }

    return { token: token }
  }

  // Generate token from request body.
  private async generateToken(user: CreateUserDto): Promise<string> {
    const payload = { sub: user.name, iat: Date.now() }
    try {
      return await this.jwtService.signAsync(payload);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  // Return hashed password.
  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, SALT_LENGTH);
    return hash;
  }
  
  // Validate user. Find user by name and compare passwords.
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findUserByName(userDto.name);
    // If user with this name not found.
    if (!user) {
      throw new UnauthorizedException("Incorrect name or password.");
    }

    const passwordsEquals = await bcrypt.compare(userDto.password, user.password);
    // If the database password and the request body do not match
    if (!passwordsEquals) {
      throw new UnauthorizedException("Incorrect name or password.");
    }

    return user;
  }

}
