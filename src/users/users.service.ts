import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserDbDto } from './dto/user-db.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserDbDto) {
    const userData = await this.prismaService.user.create({data: user});
    return userData;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByName(name: string) {
    const user = await this.prismaService.user.findFirst({ where: {name} });
    return user;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
