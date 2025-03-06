import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put, UseGuards } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiTags, ApiNotFoundResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/common/roles/enums/role.enum';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { IssueDto } from '@app/contract';
import { ISSUES_CONTROLLER, ISSUES_ROUTES } from '@app/contract';
import { Roles } from 'src/common/roles/roles.decorator';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';
import { Authorization } from 'src/common/decorators/auth.decorator';
import { Project } from 'src/common/decorators/projects.decorator';
import { ProjectEntity } from '../projects/entities/project.entity';

@Authorization()
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('issues')
@ApiDefaultResponses()
@Controller(ISSUES_CONTROLLER)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: "Create and return new issue"})
  @ApiCreatedResponse({ type: IssueDto, description: "Return created issue" })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Post(ISSUES_ROUTES.CREATE)
  create(@Body() createIssueDto: CreateIssueDto,
         @User() user: UserEntity,
         @Project() project: ProjectEntity
    ) {
    return this.issuesService.create(createIssueDto, user, project.id);
  }


  @ApiOperation({ summary: "Return all project issues"})
  @ApiOkResponse({ type: [IssueDto], description: "Return issues array" })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiQuery({ name: 'limit', type: Number, required: false})
  @Get(ISSUES_ROUTES.GET_ALL)
  findAll(@Project() project: ProjectEntity,
          @Query('limit', new ParseIntPipe({optional: true})) limit?: number,
  ) {
    return this.issuesService.findAll(project.id, limit);
  }


  @ApiOperation({ summary: "Return issue by id"})
  @ApiOkResponse({ type: IssueDto, description: "Return issue" })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Get(ISSUES_ROUTES.GET_BY_ID)
  findOne(@Param('issueId', ParseObjectIdPipe) id: string) {
    return this.issuesService.findOne(id);
  }


  @ApiOperation({ summary: "Update issue"})
  @ApiOkResponse({ type: IssueDto, description: "Return updated issue" })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Put(ISSUES_ROUTES.UPDATE)
  update(@Param('issueId', ParseObjectIdPipe) id: string, 
         @User() user: UserEntity,
         @Body() updateIssueDto: UpdateIssueDto
    ) {
    return this.issuesService.update(id, user, updateIssueDto);
  }


  @ApiOperation({ summary: "Delete issue by id"})
  @ApiOkResponse({ type: String, description: "Return deleted issue" })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Delete(ISSUES_ROUTES.DELETE)
  remove(@Param('issueId', ParseObjectIdPipe) id: string,
         @User() user: UserEntity
  ) {
    return this.issuesService.delete(id, user);
  }
}
