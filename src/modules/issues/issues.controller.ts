import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put, UseGuards } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBearerAuth, ApiTags, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, UnauthorizdResponseDto, InternalServerErrorResponseDto, ForbiddenResponseDto, NotFoundResponseDto } from 'src/common/exceptions/dto/error-response.dto';
import { User } from 'src/common/decorators/users.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/common/roles/enums/role.enum';
import { ParseObjectIdPipe } from 'src/common/pipes/object-id.pipe';
import { IssueDto } from './dto/issue.dto';
import { ISSUES_CONTROLLER, ISSUES_ROUTES } from '@app/contract';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { ApiDefaultResponses } from 'src/common/decorators/default-response.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('issues')
@ApiDefaultResponses()
@Controller(ISSUES_CONTROLLER)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: "Create and return new issue"})
  @ApiCreatedResponse({ type: IssueDto, description: "Return created issue" })
  @Post(ISSUES_ROUTES.CREATE)
  create(@Body() createIssueDto: CreateIssueDto,
         @User() user: UserEntity
    ) {
    return this.issuesService.create(createIssueDto, user);
  }


  @ApiOperation({ summary: "Return all issues"})
  @ApiOkResponse({ type: [IssueDto], description: "Return issues array" })
  @Get(ISSUES_ROUTES.GET_ALL)
  findAll(@Query('limit', new ParseIntPipe({optional: true})) limit?: number) {
    return this.issuesService.findAll(limit);
  }


  @ApiOperation({ summary: "Return issue by id"})
  @ApiOkResponse({ type: IssueDto, description: "Return issue" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Get(ISSUES_ROUTES.GET_BY_ID)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.issuesService.findOne(id);
  }


  @ApiOperation({ summary: "Update issue"})
  @ApiOkResponse({ type: IssueDto, description: "Return updated issue" })
  @ApiNotFoundResponse({ type: NotFoundResponseDto, description: "Not found"})
  @Put(ISSUES_ROUTES.UPDATE)
  update(@Param('id', ParseObjectIdPipe) id: string, 
         @User() user: UserEntity,
         @Body() updateIssueDto: UpdateIssueDto
    ) {
    return this.issuesService.update(id, user, updateIssueDto);
  }


  @ApiOperation({ summary: "Delete issue by id"})
  @ApiOkResponse({ type: String, description: "Delete issue" })
  @Delete(ISSUES_ROUTES.DELETE)
  remove(@Param('id', ParseObjectIdPipe) id: string,
         @User() user: UserEntity
  ) {
    return this.issuesService.delete(id, user);
  }
}
