import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ListarProductosDto {
  @IsInt()
  @IsNotEmpty()
  restaurante_id: number;

  @IsOptional()
  @IsInt()
  categoria_id?: number;
}