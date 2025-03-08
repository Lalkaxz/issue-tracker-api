import { projectsIncludeOptions } from '@app/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { Cache } from 'cache-manager';
import {
  getRepositoryName,
  isGitHubRepoUrl
} from 'src/common/utils/parse-url.util';
import { PrismaService } from 'src/core/prisma/prisma.service';

import { UserEntity } from '../users/entities/user.entity';
import { ProjectsGateway } from '../websocket/projects.gateway';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectGateway: ProjectsGateway,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(
    projectDto: CreateProjectDto,
    user: UserEntity
  ): Promise<Project> {
    // Validate url.
    if (!isGitHubRepoUrl(projectDto.repoUrl)) {
      throw new BadRequestException('Invalid GitHub repository URL');
    }
    // If name in DTO not provided, get it from URL.
    const projectName =
      projectDto.name || getRepositoryName(projectDto.repoUrl);

    // Check repository URL for unique.
    const exists = await this.prismaService.project.findFirst({
      where: { repoUrl: projectDto.repoUrl }
    });
    if (exists) {
      throw new BadRequestException(
        'Project with this repository already exists'
      );
    }

    // Create and return new project.
    const project = await this.prismaService.project.create({
      data: {
        name: projectName,
        description: projectDto.description,
        repoUrl: projectDto.repoUrl,
        ownerId: user.id
      }
    });
    this.projectGateway.emitProjectCreated(project);
    await this.cacheManager.del('projects');

    return project;
  }

  // Return projects array. Supports limit parameter.
  async findAll(limit?: number): Promise<Project[]> {
    const cachedProjects = await this.cacheManager.get<Project[]>('projects');
    if (cachedProjects) {
      return cachedProjects;
    }

    const projects = await this.prismaService.project.findMany({
      take: limit
    });
    await this.cacheManager.set('projects', projects);

    return projects;
  }

  // Return project with required id.
  async findById(id: string): Promise<Project> {
    const project = await this.prismaService.project.findUnique({
      where: { id },
      include: projectsIncludeOptions
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Update 'name, description' fields in project. Only for author.
  async update(
    project: ProjectEntity,
    updateProjectDto: UpdateProjectDto,
    user: UserEntity
  ): Promise<Project> {
    if (project.ownerId !== user.id) {
      throw new ForbiddenException('Only author can update project');
    }

    const updatedProject = await this.prismaService.project.update({
      where: {
        id: project.id
      },
      data: updateProjectDto
    });
    this.projectGateway.emitProjectUpdated(updatedProject);
    await this.cacheManager.del('projects');

    return updatedProject;
  }

  async delete(project: ProjectEntity, user: UserEntity): Promise<Project> {
    if (project.ownerId !== user.id) {
      throw new ForbiddenException('Only author can delete project');
    }

    const deletedProject = await this.prismaService.project.delete({
      where: {
        id: project.id
      }
    });
    this.projectGateway.emitProjectDeleted(deletedProject);
    await this.cacheManager.del('projects');

    return deletedProject;
  }
}
