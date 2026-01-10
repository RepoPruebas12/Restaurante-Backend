import { IsInt } from 'class-validator';

export class EliminarProductoDto {
  @IsInt()
  id: number;
}