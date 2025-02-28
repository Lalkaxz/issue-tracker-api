import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { IssuesModule } from './modules/issues/issues.module';
import { UsersModule } from 'src/modules/users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import configuration from 'src/core/config/configuration';
import { LoggerModule } from 'nestjs-pino';
import httpConfiguration from 'src/core/logger/logger.config';
import { exceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { IS_DEV_ENV } from './common/utils/is-dev.util';


@Module({
  imports: [
    PrismaModule, 
    IssuesModule, 
    UsersModule, 
    AuthModule, 
    AdminModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          pinoHttp: httpConfiguration
        }
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
export class AppModule {}
