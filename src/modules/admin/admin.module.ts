import { Module } from '@nestjs/common'

import { WebsocketModule } from '../websocket/websocket.module'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
	imports: [WebsocketModule],
	controllers: [AdminController],
	providers: [AdminService],
	exports: [AdminService]
})
export class AdminModule {}
