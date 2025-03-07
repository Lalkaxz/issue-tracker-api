import { Module } from '@nestjs/common'

import { CommentsGateway } from './comments.gateway'
import { IssuesGateway } from './issues.gateway'
import { ProjectsGateway } from './projects.gateway'

@Module({
	providers: [IssuesGateway, CommentsGateway, ProjectsGateway],
	exports: [IssuesGateway, CommentsGateway, ProjectsGateway]
})
export class WebsocketModule {}
