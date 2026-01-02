import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AutenticacionRequestDto {
    @ApiProperty({ example: '' })
    @IsString()
    email: string;

    @ApiProperty({ example: '' })
    @IsString()
    password: string;
}