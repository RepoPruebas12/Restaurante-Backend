import { IsInt, IsNotEmpty } from 'class-validator';

export class ListarMesasDto {
  @IsInt()
  @IsNotEmpty()
  restaurante_id: number;
}