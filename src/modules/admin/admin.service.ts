import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateUserRoleDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, roleDto: UpdateUserRoleDto): Promise<User> {
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

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
