import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.email,
      loginDto.password,
      loginDto.restaurante_id,
    );
  }

  @Post('x7k9p2m4n8q1r5s6')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.nombre,
      registerDto.email,
      registerDto.password,
      registerDto.rol_id,
      registerDto.restaurante_id,
    );
  }
}