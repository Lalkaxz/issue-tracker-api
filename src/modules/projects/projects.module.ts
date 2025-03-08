import { Module } from '@nestjs/common';

import { WebsocketModule } from '../websocket/websocket.module';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [WebsocketModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
