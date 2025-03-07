import { COMMENTS_EVENTS } from '@app/contract'
import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Comment } from '@prisma/client'
import { Server } from 'socket.io'

@WebSocketGateway()
export class CommentsGateway {
	@WebSocketServer() private server: Server

	@SubscribeMessage(COMMENTS_EVENTS.CREATED)
	emitCommentCreated(issue: Comment) {
		this.server.emit(COMMENTS_EVENTS.CREATED, issue)
	}

	@SubscribeMessage(COMMENTS_EVENTS.UPDATED)
	emitCommentUpdated(issue: Comment) {
		this.server.emit(COMMENTS_EVENTS.UPDATED, issue)
	}

	@SubscribeMessage(COMMENTS_EVENTS.DELETED)
	emitCommentDeleted(issue: Comment) {
		this.server.emit(COMMENTS_EVENTS.DELETED, issue)
	}
}
