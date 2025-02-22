import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IssuesModule } from '../issues/issues.module';
import { UsersModule } from 'src/users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from 'src/admin/admin.module';
import configuration from 'src/config/configuration';
import validation from 'src/config/validation';
import { LoggerModule } from 'nestjs-pino';
import httpConfiguration from 'src/logger/logger.config';


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
      validationSchema: validation
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
