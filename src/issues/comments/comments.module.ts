import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
  imports: [
    UsersModule,
    forwardRef(() => AuthModule)
  ]
})
export class CommentsModule {}
