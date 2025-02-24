import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [
    UsersModule,
    forwardRef(() => AuthModule)
  ]
})
export class AdminModule {}
