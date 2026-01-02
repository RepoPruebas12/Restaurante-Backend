import { ApiProperty } from "@nestjs/swagger";

export class UpdRolesRequestDto {
    @ApiProperty({ example: 0 })
    id: number

    @ApiProperty({ example: '' })
    rol: string
}