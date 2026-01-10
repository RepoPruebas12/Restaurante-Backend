import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Pool, PoolClient } from 'pg';
import { ActualizarEstadoMesaDto } from '../dto/actualizar-estado-mesa.dto';

@Injectable()
export class MesasService {
  private pool: Pool;

  constructor(private readonly databaseService: DatabaseService) {
    this.pool = this.databaseService.getPool();
  }

  async listarSalones(restaurante_id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_salones($1) as salones`;
      const result = await client.query(query, [restaurante_id]);

      return {
        status: true,
        data: result.rows[0].salones || []
      };
    } catch (error) {
      console.error('❌ Error al listar salones:', error);
      return {
        status: false,
        message: 'Error interno al listar salones',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async listarMesas(restaurante_id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_mesas($1) as mesas`;
      const result = await client.query(query, [restaurante_id]);

      return {
        status: true,
        data: result.rows[0].mesas || []
      };
    } catch (error) {
      console.error('❌ Error al listar mesas:', error);
      return {
        status: false,
        message: 'Error interno al listar mesas',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async listarMesasPorSalon(restaurante_id: number, salon_id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_mesas_por_salon($1, $2) as mesas`;
      const result = await client.query(query, [restaurante_id, salon_id]);

      return {
        status: true,
        data: result.rows[0].mesas || []
      };
    } catch (error) {
      console.error('❌ Error al listar mesas por salón:', error);
      return {
        status: false,
        message: 'Error interno al listar mesas',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async actualizarEstadoMesa(dto: ActualizarEstadoMesaDto): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_actualizar_estado_mesa($1, $2, $3) as mesa`;
      const values = [dto.mesa_id, dto.estado_id, dto.comensales];

      const result = await client.query(query, values);

      return {
        status: true,
        data: result.rows[0].mesa
      };
    } catch (error) {
      console.error('❌ Error al actualizar estado mesa:', error);
      return {
        status: false,
        message: 'Error interno al actualizar estado mesa'
      };
    } finally {
      if (client) client.release();
    }
  }
}