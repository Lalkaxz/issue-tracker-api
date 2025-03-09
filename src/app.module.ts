import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import configuration from 'src/core/config/configuration';
import { winstonFactory } from 'src/core/config/logger.config';
import { httpExceptionFilter } from 'src/core/logger/http-exception.filter';
import { AdminModule } from 'src/modules/admin/admin.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

import { PrismaMiddleware } from './common/middlewares/prisma.middleware';
import { IS_DEV_ENV } from './common/utils/is-dev.util';
import { cacheFactory } from './core/config/redis.config';
import { throttlerFactory } from './core/config/throttler.config';
import { CoreController } from './core/core.controller';
import { CoreService } from './core/core.service';
import { exceptionFilter } from './core/logger/exception.filter';
import { PrismaModule } from './core/prisma/prisma.module';
import { IssuesModule } from './modules/issues/issues.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: IS_DEV_ENV ? [configuration] : undefined,
      ignoreEnvFile: !IS_DEV_ENV
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: winstonFactory
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: throttlerFactory
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: cacheFactory
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET')
      })
    }),
    PrismaModule,
    ProjectsModule,
    IssuesModule,
    AuthModule,
    UsersModule,
    AdminModule,
    WebsocketModule
  ],
  exports: [JwtModule],
  controllers: [CoreController],
  providers: [
    exceptionFilter,
    httpExceptionFilter,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    CoreService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrismaMiddleware).forRoutes('*');
  }
}
