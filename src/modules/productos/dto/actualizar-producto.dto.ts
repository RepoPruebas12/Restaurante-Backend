import { IsString, IsNumber, IsInt, IsOptional, Min, Max } from 'class-validator';

export class ActualizarProductoDto {
  @IsInt()
  id: number;

  @IsString()
  nombre: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsInt()
  categoria_id: number;

  @IsInt()
  @Min(0)
  @Max(1)
  disponible: number;

  @IsInt()
  @Min(0)
  @Max(1)
  controla_stock: number;

  @IsInt()
  @Min(0)
  stock_actual: number;

  @IsInt()
  @Min(0)
  stock_minimo: number;

  @IsOptional()
  @IsString()
  imagen?: string;
}