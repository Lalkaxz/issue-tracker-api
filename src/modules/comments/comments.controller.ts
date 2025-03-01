import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/roles/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentDto, COMMENTS_CONTROLLER, COMMENTS_ROUTES } from '@app/contract';
import { Issue } from 'src/common/decorators/issues.decorator';
import { IssueEntity } from '../issues/entities/issue.entity';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('comments')
@Controller(COMMENTS_CONTROLLER)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(COMMENTS_ROUTES.CREATE)
  create(@Body() createCommentDto: CreateCommentDto,
         @Issue() issue: IssueEntity,
         @User() user: UserEntity         
  ): Promise<CommentDto> {
    return this.commentsService.create(createCommentDto, issue, user);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
