import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDbDto } from './dto/user-db.dto';
import { User } from './entities/user.entity';

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

}
