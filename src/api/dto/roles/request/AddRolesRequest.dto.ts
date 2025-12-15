import { ApiProperty } from "@nestjs/swagger";

export class AddRolesRequestDto {
    @ApiProperty({ example: '' })
    rol: string
}