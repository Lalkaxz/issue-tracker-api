import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';

import { WebsocketModule } from '../websocket/websocket.module';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
  imports: [UsersModule, WebsocketModule]
})
export class CommentsModule {}
