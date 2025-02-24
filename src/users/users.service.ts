import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDbDto } from './dto/user-db.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { Expand } from './users.enum';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create new document in database with user credentials and return it.
  async create(user: UserDbDto) {
    return await this.prismaService.user.create({data: user});
  }

  // Find user document in database with required name and return it.
  async findUserByName(name: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({ where: {name} });
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
  async getUserProfile(name: string, expand?: Expand[]): Promise<UserProfileDto> {
    const selectOptions: Prisma.UserSelect = {
      id: true,
      name: true,
      roles: true
    }

    expand?.forEach((value) => selectOptions[value] = true);

    const profile = await this.prismaService.user.findFirst({
      where: {name},
      select: selectOptions
    })
    
    if (!profile) {
      throw new NotFoundException("User not found");
    }
    return profile;
  }

}
