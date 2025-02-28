import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../roles/roles.guard";
import { Role } from "../roles/enums/role.enum";
import { Roles } from "../roles/roles.decorator";

export function RolesAuthorization(roles?: Role[] | string[]) {
    return applyDecorators(UseGuards(RolesGuard), Roles(roles));
}