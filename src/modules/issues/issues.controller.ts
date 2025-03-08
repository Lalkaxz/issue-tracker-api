import { IssueDto } from '@app/contract';
import { ISSUES_CONTROLLER, ISSUES_ROUTES } from '@app/contract';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { Authorization } from 'src/common/decorators/auth.decorator';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { Project } from 'src/common/decorators/projects.decorator';
import { User } from 'src/common/decorators/users.decorator';
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { Role } from 'src/common/roles/enums/role.enum';
import { Roles } from 'src/common/roles/roles.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import { ProjectEntity } from '../projects/entities/project.entity';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssuesService } from './issues.service';

@Authorization()
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('issues')
@ApiDefaultResponses()
@Controller(ISSUES_CONTROLLER)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'Create and return new issue' })
  @ApiCreatedResponse({ type: IssueDto, description: 'Return created issue' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Post(ISSUES_ROUTES.CREATE)
  create(
    @Body() createIssueDto: CreateIssueDto,
    @User() user: UserEntity,
    @Project() project: ProjectEntity
  ) {
    return this.issuesService.create(createIssueDto, user, project.id);
  }

  @ApiOperation({ summary: 'Return all project issues' })
  @ApiOkResponse({ type: [IssueDto], description: 'Return issues array' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get(ISSUES_ROUTES.GET_ALL)
  findAll(
    @Project() project: ProjectEntity,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    return this.issuesService.findAll(project.id, limit);
  }

  @ApiOperation({ summary: 'Return issue by id' })
  @ApiOkResponse({ type: IssueDto, description: 'Return issue' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Get(ISSUES_ROUTES.GET_BY_ID)
  findOne(@Param('issueId', ParseObjectIdPipe) id: string) {
    return this.issuesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update issue' })
  @ApiOkResponse({ type: IssueDto, description: 'Return updated issue' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Put(ISSUES_ROUTES.UPDATE)
  update(
    @Param('issueId', ParseObjectIdPipe) id: string,
    @User() user: UserEntity,
    @Body() updateIssueDto: UpdateIssueDto
  ) {
    return this.issuesService.update(id, user, updateIssueDto);
  }

  @ApiOperation({ summary: 'Delete issue by id' })
  @ApiOkResponse({ type: String, description: 'Return deleted issue' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Delete(ISSUES_ROUTES.DELETE)
  remove(
    @Param('issueId', ParseObjectIdPipe) id: string,
    @User() user: UserEntity
  ) {
    return this.issuesService.delete(id, user);
  }
}
