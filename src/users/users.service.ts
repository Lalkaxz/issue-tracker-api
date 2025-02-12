import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDbDto } from './dto/user-db.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create new document in database with user credentials and return it.
  async create(user: UserDbDto) {
    const userData = await this.prismaService.user.create({data: user});
    return userData;
  }

  // Find user document in database with required name and return it.
  async findUserByName(name: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({ where: {name} });
    return user;
  }


  async getUserProfile(name: string) {
    const profile = await this.prismaService.user.findFirst({
      where: {name},
      include: {
        issues: true,
        comments: true
      },
      omit: {
        password: true,
        token: true,
        updatedAt: true,
        createdAt: true
      }
    })
    
    if (!profile) {
      throw new NotFoundException("User not found");
    }

    return profile;
  }

}
