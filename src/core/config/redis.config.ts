import { CacheOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { seconds } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-yet';

export const cacheFactory = async (
  config: ConfigService
): Promise<CacheOptions> => {
  const store = await redisStore({
    ttl: seconds(config.getOrThrow<number>('REDIS_TTL')),
    socket: {
      host: config.getOrThrow<string>('REDIS_HOST'),
      port: config.getOrThrow<number>('REDIS_PORT')
    }
  });

  const options: CacheOptions = {
    ttl: seconds(config.getOrThrow<number>('REDIS_TTL')),
    stores: [store]
  };
  return options;
};
