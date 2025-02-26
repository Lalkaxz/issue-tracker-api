import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, Put } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBearerAuth, ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, UnauthorizdResponseDto, NotFoundResponseDto, InternalServerErrorResponseDto, ForbiddenResponseDto } from 'src/exceptions/dto/error-response.dto';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';
import { User } from 'src/users/users.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ParseObjectIdPipe } from 'src/pipes/object-id.pipe';
import { IssueDto } from './dto/issue.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: "Create and return new issue"})
  @ApiCreatedResponse({ type: IssueDto, description: "Return created issue" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Post()
  create(@Body() createIssueDto: CreateIssueDto,
         @User() user: UserEntity
    ) {
    return this.issuesService.create(createIssueDto, user);
  }


  @ApiOperation({ summary: "Return all issues"})
  @ApiOkResponse({ type: [IssueDto], description: "Return issues array" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Get()
  findAll(@Query('limit', new ParseIntPipe({optional: true})) limit?: number) {
    return this.issuesService.findAll(limit);
  }


  @ApiOperation({ summary: "Return issue by id"})
  @ApiOkResponse({ type: IssueDto, description: "Return issue" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.issuesService.findOne(id);
  }


  @ApiOperation({ summary: "Update issue"})
  @ApiOkResponse({ type: IssueDto, description: "Return updated issue" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Put(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, 
         @User() user: UserEntity,
         @Body() updateIssueDto: UpdateIssueDto
    ) {
    return this.issuesService.update(id, user, updateIssueDto);
  }


  @ApiOperation({ summary: "Delete issue by id"})
  @ApiOkResponse({ type: String, description: "Delete issue" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string,
         @User() user: UserEntity
  ) {
    return this.issuesService.delete(id, user);
  }
}
