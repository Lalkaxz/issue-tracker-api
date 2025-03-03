import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserRoleDto } from '../users/dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  // Update user roles.
  async updateUserRole(id: string, roleDto: UpdateUserRoleDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({where: {id}});
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
  
    return await this.prismaService.user.update({
      where: {id},
      data: {
        roles: roleDto.roles
      }
    });
  }

  // Change value in 'isDeactivated' field in database document. Set current Date to 'deactivatedAt' if isDeactivated is true.
  async deactivateUser(id: string, isDeactivated: boolean): Promise<User> {

    const user = await this.prismaService.user.findUnique({where: {id}});
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const deactivateUserData: Prisma.UserUpdateInput = {
      isDeactivated: isDeactivated
    }
    const now = new Date
    
    if (isDeactivated) {
      if (!user.deactivatedAt) {
        deactivateUserData.deactivatedAt = new Date(); // Set current time if 'deactivatedAt' is null.
      }
    } else {
      // If 'isDeactivated' is false, set null.
      deactivateUserData.deactivatedAt = null;
    }

    return await this.prismaService.user.update({
      where: {id},
      data: deactivateUserData
    });
  }
}
