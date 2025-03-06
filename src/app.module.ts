import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { IssuesModule } from './modules/issues/issues.module';
import { UsersModule } from 'src/modules/users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import configuration from 'src/core/config/configuration';
import { LoggerModule } from 'nestjs-pino';
import { optionsFactory } from 'src/core/config/logger.config';
import { exceptionFilter } from 'src/core/logger/http-exception.filter';
import { IS_DEV_ENV } from './common/utils/is-dev.util';
import { PrismaMiddleware } from './common/middlewares/prisma.middleware';
import { COMMENTS_CONTROLLER } from '@app/contract';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { ProjectsModule } from './modules/projects/projects.module';


@Module({
  imports: [
    PrismaModule, 
    IssuesModule, 
    UsersModule, 
    AuthModule, 
    AdminModule,
    WebsocketModule,
    ProjectsModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: optionsFactory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: IS_DEV_ENV ? [configuration] : undefined,
      ignoreEnvFile: !IS_DEV_ENV
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET') 
      }),
    }),
  ],
  exports: [JwtModule],
  providers: [
    exceptionFilter
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrismaMiddleware).forRoutes('*');
  }
}
