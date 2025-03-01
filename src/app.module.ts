import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { IssuesModule } from './modules/issues/issues.module';
import { UsersModule } from 'src/modules/users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import configuration from 'src/core/config/configuration';
import { LoggerModule } from 'nestjs-pino';
import httpConfiguration from 'src/core/logger/logger.config';
import { exceptionFilter } from 'src/core/logger/http-exception.filter';
import { IS_DEV_ENV, isDevEnv } from './common/utils/is-dev.util';
import { PrismaMiddleware } from './common/middlewares/prisma.middleware';
import { COMMENTS_CONTROLLER } from '@app/contract';


@Module({
  imports: [
    PrismaModule, 
    IssuesModule, 
    UsersModule, 
    AuthModule, 
    AdminModule,
    //TODO:
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = {
          pinoHttp: { ...httpConfiguration }
        }
        if (options.pinoHttp.transport && options.pinoHttp.transport.options) {
          options.pinoHttp.transport.options.ignore = !isDevEnv(configService)
          ? 'pid,hostname,context,req,res'
          : '';
        }
        return options;
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      ignoreEnvFile: !IS_DEV_ENV
    })
  ],
  providers: [
    exceptionFilter
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrismaMiddleware).forRoutes(COMMENTS_CONTROLLER);
  }
}
