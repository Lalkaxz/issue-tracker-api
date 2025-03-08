import { ConfigService } from '@nestjs/config';
import { seconds, ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerFactory = async (
  config: ConfigService
): Promise<ThrottlerModuleOptions> => [
  {
    ttl: seconds(config.getOrThrow<number>('THROTTLE_TTL')),
    limit: config.getOrThrow<number>('THROTTLE_LIMIT')
  }
];
