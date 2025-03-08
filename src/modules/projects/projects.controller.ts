import {
  ProjectDto,
  PROJECTS_CONTROLLER,
  PROJECTS_ROUTES
} from '@app/contract';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

import { UserEntity } from '../users/entities/user.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Authorization()
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('projects')
@ApiDefaultResponses()
@Controller(PROJECTS_CONTROLLER)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create and return new project' })
  @ApiCreatedResponse({
    type: ProjectDto,
    description: 'Return created project'
  })
  @Post(PROJECTS_ROUTES.CREATE)
  create(@Body() createProjectDto: CreateProjectDto, @User() user: UserEntity) {
    return this.projectsService.create(createProjectDto, user);
  }

  @ApiOperation({ summary: 'Return all projects' })
  @ApiOkResponse({ type: [ProjectDto], description: 'Return projects array' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get(PROJECTS_ROUTES.GET_ALL)
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    return this.projectsService.findAll(limit);
  }

  @ApiOperation({ summary: 'Return project by id' })
  @ApiOkResponse({ type: ProjectDto, description: 'Return project' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @Get(PROJECTS_ROUTES.GET_BY_ID)
  findOne(@Param('projectId', ParseObjectIdPipe) id: string) {
    return this.projectsService.findById(id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiOkResponse({ type: ProjectDto, description: 'Return updated project' })
  @ApiNotFoundResponse({
    type: NotFoundResponseDto,
    description: 'Not found'
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Patch(PROJECTS_ROUTES.UPDATE)
  update(
    @Project() project: ProjectEntity,
    @Body() updateProjectDto: UpdateProjectDto,
    @User() user: UserEntity
  ) {
    return this.projectsService.update(project, updateProjectDto, user);
  }

  @ApiOperation({ summary: 'Delete project by id' })
  @ApiOkResponse({ type: String, description: 'Return deleted project' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project id' })
  @Delete(PROJECTS_ROUTES.DELETE)
  remove(@Project() project: ProjectEntity, @User() user: UserEntity) {
    return this.projectsService.delete(project, user);
  }
}
