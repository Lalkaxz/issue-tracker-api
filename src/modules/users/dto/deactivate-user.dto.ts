import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class DeactivateUserDto {
    @ApiProperty({
        type: Boolean,
        description: "User deactivation status. Write 'true' for deactivate user.",
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly isDeactivated: boolean;
}