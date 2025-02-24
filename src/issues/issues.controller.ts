import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BadRequestErrorResponseDto, UnauthorizdResponseDto, NotFoundResponseDto, InternalServerErrorResponseDto } from 'src/exceptions/dto/error-response.dto';
import { UserProfileDto } from 'src/users/dto/user-profile.dto';
import { User } from 'src/users/users.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ParseObjectIdPipe } from 'src/pipes/object-id.pipe';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.User])
@ApiBearerAuth()
@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: "Create and return new issue"})
  @ApiCreatedResponse({ type: UserProfileDto, description: "Return created issue" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Post()
  create(@Body() createIssueDto: CreateIssueDto,
         @User() user: UserEntity
    ) {
    return this.issuesService.create(createIssueDto, user);
  }

  @ApiOperation({ summary: "Return all issues"})
  @ApiOkResponse({ type: UserProfileDto, description: "Return issues array" })
  @ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" })
  @ApiUnauthorizedResponse({ type: UnauthorizdResponseDto, description: "Unauthorized" })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" })
  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }
}
