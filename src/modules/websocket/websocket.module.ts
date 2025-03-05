import { Module } from '@nestjs/common';
import { IssuesGateway } from './issues.gateway';
import { CommentsGateway } from './comments.gateway';

@Module({
  providers: [IssuesGateway, CommentsGateway],
  exports: [IssuesGateway, CommentsGateway]
})
export class WebsocketModule {}
