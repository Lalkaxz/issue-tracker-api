import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { IssuesModule } from 'src/issues/issues.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => IssuesModule),
    JwtModule.register({
      secret: process.env.SECRET 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
