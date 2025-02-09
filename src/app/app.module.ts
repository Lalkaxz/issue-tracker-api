import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IssuesModule } from '../issues/issues.module';
import { UsersModule } from 'src/users/users.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    PrismaModule, 
    IssuesModule, 
    UsersModule, 
    AuthModule, 
    AdminModule,
    ConfigModule.forRoot({
      envFilePath: ".env"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
