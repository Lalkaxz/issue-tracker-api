import { ISSUES_EVENTS } from "@app/contract";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Issue } from '@prisma/client';
import { Server } from "socket.io";

@WebSocketGateway()
export class IssuesGateway {
    @WebSocketServer() private server: Server

    @SubscribeMessage(ISSUES_EVENTS.CREATED)
    emitIssueCreated(issue: Issue) {
        this.server.emit(ISSUES_EVENTS.CREATED, issue);
    }


    @SubscribeMessage(ISSUES_EVENTS.UPDATED)
    emitIssueUpdated(issue: Issue) {
        this.server.emit(ISSUES_EVENTS.UPDATED, issue);
    }


    @SubscribeMessage(ISSUES_EVENTS.DELETED)
    emitIssueDeleted(issue: Issue) {
        this.server.emit(ISSUES_EVENTS.DELETED, issue);
    }
}