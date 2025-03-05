import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from 'src/modules/users/users.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [
    UsersModule,
    CommentsModule,
    WebsocketModule
  ],
  exports: [IssuesService]
})
export class IssuesModule {}
