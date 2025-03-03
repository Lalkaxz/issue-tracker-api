import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserDbDto } from './dto/user-db.dto';
import { User } from '@prisma/client';
import { UpdateDisplayNameDto, UpdateTokenDto } from './dto/update-user.dto';
import { UserProfileDto } from '../../../libs/contract/users/dto/user-profile.dto';
import { usersProfileSelectOptions } from '@app/contract';
import { UserEntity } from './entities/user.entity';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthService } from '../auth/auth.service';
import { validatePasswords } from 'src/common/utils/compare-passwords.util';

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
  async updateUserToken(user: UpdateTokenDto): Promise<User | null> {
    const userData = await this.prismaService.user.update({
      where: { name: user.name },
      data: { token: user.token }
    })
    if (!userData) {
      throw new InternalServerErrorException('Token update failed');
    }
    return userData;
  }

  // Update user display name in database document.
  async updateUserDisplayName(nameDto: UpdateDisplayNameDto, user: UserEntity) {
    const userData = await this.prismaService.user.update({
      where: {name: user.name},
      data: {displayName: nameDto.displayName}
    })
    if (!userData) {
      throw new InternalServerErrorException('Display name update failed');
    }
    return {message: 'Dispay name updated succesfully'};
  }
  
  // Find user document in database and return user profile.
  async getUserProfile(name: string): Promise<UserProfileDto> {
    const profile = await this.prismaService.user.findFirst({
      where: {name},
      select: usersProfileSelectOptions
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

  // Delete user document in database by id. Return boolean value.
  async deleteUser(id: string,
                   user: UserEntity,
                   deleteUserDto: DeleteUserDto
  ) {
    const match = await validatePasswords(deleteUserDto.password, user.password);
    if (!match) {
      throw new BadRequestException("Incorrect password");
    }

    if (user.id === id) {
      throw new ForbiddenException(`You cant delete yourself`)
    }

    // await this.prismaService.issue.deleteMany({
    //   where: { authorId: id }
    // });

    // await this.prismaService.comment.deleteMany({
    //   where: { authorId: id }
    // });

    const succesfully = await this.prismaService.user.delete({where: {id}});
    if (!succesfully) {
      throw new InternalServerErrorException('Delete user failed');
    }

    return {message: 'User deleted succesfully'};
  }
}
