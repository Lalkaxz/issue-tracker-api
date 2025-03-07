import { PROJECTS_EVENTS } from '@app/contract'
import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Project } from '@prisma/client'
import { Server } from 'socket.io'

@WebSocketGateway()
export class ProjectsGateway {
	@WebSocketServer() private server: Server

	@SubscribeMessage(PROJECTS_EVENTS.CREATED)
	emitProjectCreated(project: Project) {
		this.server.emit(PROJECTS_EVENTS.CREATED, project)
	}

	@SubscribeMessage(PROJECTS_EVENTS.UPDATED)
	emitProjectUpdated(project: Project) {
		this.server.emit(PROJECTS_EVENTS.UPDATED, project)
	}

	@SubscribeMessage(PROJECTS_EVENTS.DELETED)
	emitProjectDeleted(project: Project) {
		this.server.emit(PROJECTS_EVENTS.DELETED, project)
	}
}
