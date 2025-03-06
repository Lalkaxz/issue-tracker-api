import { CacheOptions } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";

export const cacheFactory = async (config: ConfigService): Promise<CacheOptions> => {
    const store = await redisStore({
        ttl: config.getOrThrow<number>('REDIS_TTL') * 1000,
        socket: {
            host: config.getOrThrow<string>('REDIS_HOST'),
            port: config.getOrThrow<number>('REDIS_PORT'),
        }
    })

    const options: CacheOptions = {
        ttl: config.getOrThrow<number>('REDIS_TTL') * 1000,
        stores: [store],
    }
    return options;
}