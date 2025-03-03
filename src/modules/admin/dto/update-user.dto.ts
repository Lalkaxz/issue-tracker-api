import { ApiProperty } from "@nestjs/swagger";
import { ArrayContains, ArrayNotEmpty, IsArray, isArray, isEnum, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "src/common/roles/enums/role.enum";

export class UpdateUserRoleDto {
    @ApiProperty({
        type: [String],
        description: "User role",
        example: ["admin"],
    })
    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsArray()
    @IsEnum(Role, { each: true })
    readonly roles: Role[];
}