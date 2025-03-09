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
    await this.cacheManager.set('test', 1);
    const value = await this.cacheManager.get('test');
    if (!value) {
      throw new InternalServerErrorException('Cache value not found');
    }
    return { status: 'ok' };
  }
}
