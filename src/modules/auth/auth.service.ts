import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../database/database.service';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private pool: Pool;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {
    this.pool = this.databaseService.getPool();
  }

  async login(email: string, password: string, restaurante_id: number) {
    const client = await this.pool.connect();
    
    try {
      const query = `SELECT * FROM func_login_usuario($1, $2)`;
      const result = await client.query(query, [email, restaurante_id]);
      
      if (result.rows.length === 0) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        rol: user.rol,
        restaurante_id: user.restaurante_id,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol,
        },
      };
    } finally {
      client.release();
    }
  }

  async register(nombre: string, email: string, password: string, rol_id: number, restaurante_id: number) {
    const client = await this.pool.connect();
    
    try {
      const checkQuery = `SELECT id FROM usuarios WHERE email = $1 AND restaurante_id = $2`;
      const checkResult = await client.query(checkQuery, [email, restaurante_id]);
      
      if (checkResult.rows.length > 0) {
        throw new UnauthorizedException('El email ya está registrado');
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO usuarios (restaurante_id, rol_id, nombre, email, password, activo)
        VALUES ($1, $2, $3, $4, $5, true)
        RETURNING id, nombre, email, restaurante_id
      `;

      const result = await client.query(insertQuery, [
        restaurante_id,
        rol_id,
        nombre,
        email,
        passwordHash,
      ]);

      return {
        status: true,
        message: 'Usuario creado exitosamente',
        user: result.rows[0],
      };
    } finally {
      client.release();
    }
  }
}