import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class ActualizarEstadoMesaDto {
  @IsInt()
  @IsNotEmpty()
  mesa_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(2)
  estado_id: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  comensales: number;
}