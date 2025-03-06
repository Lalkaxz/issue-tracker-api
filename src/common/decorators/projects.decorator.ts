import { BadRequestException, createParamDecorator, ExecutionContext, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProjectEntity } from "src/modules/projects/entities/project.entity";

export const Project = createParamDecorator(
    async (data: unknown, context: ExecutionContext): Promise<ProjectEntity> => {
        const request: Request = context.switchToHttp().getRequest();
        if (!request.prisma) {
            throw new InternalServerErrorException(`'PrismaService' not provided in Request`)
        }
        const prismaService: PrismaService = request.prisma;
        const projectId = request.params.projectId;
        if (!projectId) {
            throw new InternalServerErrorException(`Project ID not provided in the URL.`);
        }

        if (!Types.ObjectId.isValid(projectId)) {
            throw new BadRequestException('Invalid projectId');
        }

        const project = await prismaService.project.findUnique({ where: {id: projectId} })
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }
)