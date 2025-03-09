import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class CoreService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async healthCheck() {
    await this.checkCache();
    await this.checkDatabase();

    return { status: 'ok' };
  }

  private async checkCache(): Promise<boolean> {
    try {
      await this.cacheManager.set('test', 'ok');
      const value = await this.cacheManager.get('test');
      return value === 'ok';
    } catch {
      throw new InternalServerErrorException('Cache service not working');
    }
  }

  private async checkDatabase(): Promise<boolean> {
    const exists = await this.prismaService.user.findMany();

    if (!exists) {
      throw new InternalServerErrorException('Prisma service not working');
    }
    return true;
  }
}
