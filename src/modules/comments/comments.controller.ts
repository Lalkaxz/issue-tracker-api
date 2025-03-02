import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseIntPipe, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/enums/role.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentDto, COMMENTS_CONTROLLER, COMMENTS_ROUTES } from '@app/contract';
import { Issue } from 'src/common/decorators/issues.decorator';
import { IssueEntity } from '../issues/entities/issue.entity';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('comments')
@ApiDefaultResponses()
@Controller(COMMENTS_CONTROLLER)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  
  @ApiOperation({ summary: "Create and return new issue comment"})
  @ApiCreatedResponse({ type: CommentDto, description: "Return created issue comment" })
  @Post(COMMENTS_ROUTES.CREATE)
  create(@Body() createCommentDto: CreateCommentDto,
         @Issue() issue: IssueEntity,
         @User() user: UserEntity         
  ): Promise<CommentDto> {
    return this.commentsService.create(createCommentDto, issue, user);
  }


  @ApiOperation({ summary: "Return all issues comments"})
  @ApiOkResponse({ type: [CommentDto], description: "Return issues comments array" })
  @Get(COMMENTS_ROUTES.GET_ALL)
  findAll(@Issue() issue: IssueEntity,
          @Query('limit', new ParseIntPipe({optional: true})) limit?: number
    ): Promise<CommentDto[]> {
    return this.commentsService.findAll(issue.id, limit);
  }

  @ApiOperation({ summary: "Return issue comment by id"})
  @ApiOkResponse({ type: CommentDto, description: "Return issues comment" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Get(COMMENTS_ROUTES.GET_BY_ID)
  findOne(@Param('commentId') commentId: string): Promise<CommentDto> {
    return this.commentsService.findOne(commentId);
  }

  @ApiOperation({ summary: "Update issue comment"})
  @ApiOkResponse({ type: CommentDto, description: "Return updated issue comment" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Put(COMMENTS_ROUTES.UPDATE)
  update(@Param('commentId') commentId: string,
         @User() user: UserEntity,
         @Body() updateCommentDto: UpdateCommentDto
    ): Promise<CommentDto> {
    return this.commentsService.update(commentId, user, updateCommentDto);
  }

  @ApiOperation({ summary: "Update issue comment"})
  @ApiOkResponse({ type: CommentDto, description: "Return updated issue comment" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Delete(COMMENTS_ROUTES.DELETE)
  remove(@Param('commentId') commentId: string,
        @User() user: UserEntity
    ) {
    return this.commentsService.remove(commentId, user);
  }
}
