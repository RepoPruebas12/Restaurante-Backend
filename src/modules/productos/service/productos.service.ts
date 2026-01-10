import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import { Pool, PoolClient } from 'pg';
import { CrearProductoDto } from '../dto/crear-producto.dto';
import { ActualizarProductoDto } from '../dto/actualizar-producto.dto';

@Injectable()
export class ProductosService {
  private pool: Pool;

  constructor(private readonly databaseService: DatabaseService) {
    this.pool = this.databaseService.getPool();
  }

  async listarCategorias(): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_categorias() as categorias`;
      const result = await client.query(query);

      return {
        status: true,
        data: result.rows[0].categorias || []
      };
    } catch (error) {
      console.error('❌ Error al listar categorías:', error);
      return {
        status: false,
        message: 'Error interno al listar categorías',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async listarProductos(restaurante_id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_productos($1) as productos`;
      const result = await client.query(query, [restaurante_id]);

      return {
        status: true,
        data: result.rows[0].productos || []
      };
    } catch (error) {
      console.error('❌ Error al listar productos:', error);
      return {
        status: false,
        message: 'Error interno al listar productos',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async listarProductosPorCategoria(restaurante_id: number, categoria_id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_listar_productos_por_categoria($1, $2) as productos`;
      const result = await client.query(query, [restaurante_id, categoria_id]);

      return {
        status: true,
        data: result.rows[0].productos || []
      };
    } catch (error) {
      console.error('❌ Error al listar productos por categoría:', error);
      return {
        status: false,
        message: 'Error interno al listar productos',
        data: []
      };
    } finally {
      if (client) client.release();
    }
  }

  async crearProducto(dto: CrearProductoDto): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_crear_producto($1, $2, $3, $4, $5, $6, $7, $8, $9) as producto`;
      const values = [
        dto.restaurante_id,
        dto.nombre,
        dto.precio,
        dto.categoria_id,
        dto.disponible,
        dto.controla_stock,
        dto.stock_actual,
        dto.stock_minimo,
        dto.imagen || null
      ];

      const result = await client.query(query, values);

      return {
        status: true,
        message: 'Producto creado exitosamente',
        data: result.rows[0].producto
      };
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      return {
        status: false,
        message: 'Error interno al crear producto'
      };
    } finally {
      if (client) client.release();
    }
  }

  async actualizarProducto(dto: ActualizarProductoDto): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_actualizar_producto($1, $2, $3, $4, $5, $6, $7, $8, $9) as producto`;
      const values = [
        dto.id,
        dto.nombre,
        dto.precio,
        dto.categoria_id,
        dto.disponible,
        dto.controla_stock,
        dto.stock_actual,
        dto.stock_minimo,
        dto.imagen || null
      ];

      const result = await client.query(query, values);

      return {
        status: true,
        message: 'Producto actualizado exitosamente',
        data: result.rows[0].producto
      };
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      return {
        status: false,
        message: 'Error interno al actualizar producto'
      };
    } finally {
      if (client) client.release();
    }
  }

  async eliminarProducto(id: number): Promise<any> {
    let client: PoolClient | null = null;

    try {
      client = await this.pool.connect();

      const query = `SELECT func_eliminar_producto($1) as resultado`;
      const result = await client.query(query, [id]);

      return {
        status: true,
        message: 'Producto eliminado exitosamente',
        data: result.rows[0].resultado
      };
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      return {
        status: false,
        message: 'Error interno al eliminar producto'
      };
    } finally {
      if (client) client.release();
    }
  }
}