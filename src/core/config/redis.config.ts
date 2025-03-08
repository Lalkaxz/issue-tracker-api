import KeyvRedis from '@keyv/redis';
import { CacheOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { seconds } from '@nestjs/throttler';
import Keyv from 'keyv';

export const cacheFactory = async (
  config: ConfigService
): Promise<CacheOptions> => {
  const store = new Keyv({
    store: new KeyvRedis(config.getOrThrow<string>('REDIS_URI')),
    ttl: seconds(config.getOrThrow<number>('REDIS_TTL')),
    namespace: config.getOrThrow<string>('REDIS_NAMESPACE')
  });

  const options: CacheOptions = {
    ttl: seconds(config.getOrThrow<number>('REDIS_TTL')),
    stores: [store]
  };
  return options;
};
