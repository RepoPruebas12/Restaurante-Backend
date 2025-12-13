import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  rol_id: number;

  @IsNumber()
  @IsNotEmpty()
  restaurante_id: number;
}