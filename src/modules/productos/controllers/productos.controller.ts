import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { ProductosService } from '../service/productos.service';
import { CrearProductoDto } from '../dto/crear-producto.dto';
import { ActualizarProductoDto } from '../dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get('categorias')
  listarCategorias() {
    return this.productosService.listarCategorias();
  }

  @Get('listar')
  listarProductos(@Query('restaurante_id') restaurante_id: string) {
    return this.productosService.listarProductos(parseInt(restaurante_id));
  }

  @Get('listar-por-categoria')
  listarProductosPorCategoria(
    @Query('restaurante_id') restaurante_id: string,
    @Query('categoria_id') categoria_id: string
  ) {
    return this.productosService.listarProductosPorCategoria(
      parseInt(restaurante_id),
      parseInt(categoria_id)
    );
  }

  @Post('crear')
  crearProducto(@Body() dto: CrearProductoDto) {
    return this.productosService.crearProducto(dto);
  }

  @Put('actualizar')
  actualizarProducto(@Body() dto: ActualizarProductoDto) {
    return this.productosService.actualizarProducto(dto);
  }

  @Delete('eliminar/:id')
  eliminarProducto(@Param('id') id: string) {
    return this.productosService.eliminarProducto(parseInt(id));
  }
}