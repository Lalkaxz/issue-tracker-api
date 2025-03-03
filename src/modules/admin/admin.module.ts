import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { IssuesModule } from '../issues/issues.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ]
})
export class AdminModule {}
