import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserDbDto } from './dto/user-db.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create new document in database with user credentials and return it.
  async create(user: UserDbDto) {
    return await this.prismaService.user.create({data: user});
  }
  
  // Return all users profiles.
  async getAllUsers(): Promise<UserProfileDto[]> {
    return await this.prismaService.user.findMany()
  }

  // Update user token in database document.
  async updateUserToken(user: UpdateUserDto): Promise<User | null> {
    const userData = await this.prismaService.user.update({
      where: { name: user.name },
      data: { token: user.token }
    })
    return userData;
  }
  
  // Find user document in database and return user profile.
  async getUserProfile(name: string): Promise<UserProfileDto> {
    const profile = await this.prismaService.user.findFirst({
      where: {name},
      include: {
        issues: true,
        comments: true
      }
    })

    if (!profile) {
      throw new NotFoundException("User not found");
    }
    return profile;
  }

  // Find user document in database with required name and return it. Not for user use.
  async findUserByName(name: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
       where: {name},
    });
  }

}
