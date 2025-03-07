import { CommentDto, COMMENTS_CONTROLLER, COMMENTS_ROUTES } from '@app/contract'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { Authorization } from 'src/common/decorators/auth.decorator'
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator'
import { Issue } from 'src/common/decorators/issues.decorator'
import { User } from 'src/common/decorators/users.decorator'
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto'
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe'
import { Role } from 'src/common/roles/enums/role.enum'
import { Roles } from 'src/common/roles/roles.decorator'

import { IssueEntity } from '../issues/entities/issue.entity'
import { UserEntity } from '../users/entities/user.entity'

import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Authorization()
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('comments')
@ApiDefaultResponses()
@Controller(COMMENTS_CONTROLLER)
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: 'Create and return new issue comment' })
	@ApiCreatedResponse({
		type: CommentDto,
		description: 'Return created issue comment'
	})
	@ApiParam({ name: 'issueId', type: String, description: 'Issue id' })
	@Post(COMMENTS_ROUTES.CREATE)
	create(
		@Body() createCommentDto: CreateCommentDto,
		@Issue() issue: IssueEntity,
		@User() user: UserEntity
	): Promise<CommentDto> {
		return this.commentsService.create(createCommentDto, issue, user)
	}

	@ApiOperation({ summary: 'Return all issues comments' })
	@ApiOkResponse({
		type: [CommentDto],
		description: 'Return issues comments array'
	})
	@ApiParam({ name: 'issueId', type: String, description: 'Issue id' })
	@ApiQuery({ name: 'limit', type: Number, required: false })
	@Get(COMMENTS_ROUTES.GET_ALL)
	findAll(
		@Issue() issue: IssueEntity,
		@Query('limit', new ParseIntPipe({ optional: true })) limit?: number
	): Promise<CommentDto[]> {
		return this.commentsService.findAll(issue.id, limit)
	}

	@ApiOperation({ summary: 'Return issue comment by id' })
	@ApiOkResponse({ type: CommentDto, description: 'Return issues comment' })
	@ApiParam({ name: 'issueId', type: String, description: 'Issue id' })
	@ApiNotFoundResponse({
		type: NotFoundResponseDto,
		description: 'Not found'
	})
	@Get(COMMENTS_ROUTES.GET_BY_ID)
	findOne(
		@Param('commentId', ParseObjectIdPipe) commentId: string
	): Promise<CommentDto> {
		return this.commentsService.findOne(commentId)
	}

	@ApiOperation({ summary: 'Update issue comment' })
	@ApiOkResponse({
		type: CommentDto,
		description: 'Return updated issue comment'
	})
	@ApiParam({ name: 'issueId', type: String, description: 'Issue id' })
	@ApiNotFoundResponse({
		type: NotFoundResponseDto,
		description: 'Not found'
	})
	@Put(COMMENTS_ROUTES.UPDATE)
	update(
		@Param('commentId', ParseObjectIdPipe) commentId: string,
		@User() user: UserEntity,
		@Body() updateCommentDto: UpdateCommentDto
	): Promise<CommentDto> {
		return this.commentsService.update(commentId, user, updateCommentDto)
	}

	@ApiOperation({ summary: 'Update issue comment' })
	@ApiOkResponse({
		type: CommentDto,
		description: 'Return updated issue comment'
	})
	@ApiParam({ name: 'issueId', type: String, description: 'Issue id' })
	@ApiNotFoundResponse({
		type: NotFoundResponseDto,
		description: 'Not found'
	})
	@Delete(COMMENTS_ROUTES.DELETE)
	remove(
		@Param('commentId', ParseObjectIdPipe) commentId: string,
		@User() user: UserEntity
	) {
		return this.commentsService.remove(commentId, user)
	}
}
