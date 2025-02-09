import { BadRequestException, Injectable } from '@nestjs/common';
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


  async create(userDto: CreateUserDto): Promise<TokenResponseDto> {
    const exists = await this.usersService.findUserByName(userDto.name);
    if (exists) {
      throw new BadRequestException("User already registered");
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    const token = await this.generateToken(userDto);

    const userDbDto: UserDbDto = {
      name: userDto.name,
      password: hashedPassword,
      token: token
    }

    await this.usersService.create(userDbDto)
    return { token: token }



  }

  private async generateToken(user: CreateUserDto): Promise<string> {
    const payload = { sub: user.name, iat: Date.now() }
    return await this.jwtService.signAsync(payload)
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, SALT_LENGTH);
    return hash;
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findUserByName(userDto.name);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const passwordsEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordsEquals) {
      throw new BadRequestException("User not found");
    }

    return user;

  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
