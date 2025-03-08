import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';

import { CommentsModule } from '../comments/comments.module';
import { WebsocketModule } from '../websocket/websocket.module';

import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [UsersModule, CommentsModule, WebsocketModule],
  exports: [IssuesService]
})
export class IssuesModule {}
