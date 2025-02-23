import { forwardRef, Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [
    UsersModule,
    CommentsModule,
    forwardRef(() => AuthModule)
  ],
  exports: [IssuesService]
})
export class IssuesModule {}
