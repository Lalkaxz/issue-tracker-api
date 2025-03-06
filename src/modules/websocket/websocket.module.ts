import { Module } from '@nestjs/common';
import { IssuesGateway } from './issues.gateway';
import { CommentsGateway } from './comments.gateway';
import { ProjectsGateway } from './projects.gateway';

@Module({
  providers: [IssuesGateway, CommentsGateway, ProjectsGateway],
  exports: [IssuesGateway, CommentsGateway, ProjectsGateway]
})
export class WebsocketModule {}
