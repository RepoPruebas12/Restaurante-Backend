import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { MesasService } from '../service/mesas.service';
import { ActualizarEstadoMesaDto } from '../dto/actualizar-estado-mesa.dto';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Get('salones')
  listarSalones(@Query('restaurante_id') restaurante_id: string) {
    return this.mesasService.listarSalones(parseInt(restaurante_id));
  }

  @Get('listar')
  listarMesas(@Query('restaurante_id') restaurante_id: string) {
    return this.mesasService.listarMesas(parseInt(restaurante_id));
  }

  @Get('listar-por-salon')
  listarMesasPorSalon(
    @Query('restaurante_id') restaurante_id: string,
    @Query('salon_id') salon_id: string
  ) {
    return this.mesasService.listarMesasPorSalon(
      parseInt(restaurante_id),
      parseInt(salon_id)
    );
  }

  @Put('actualizar-estado')
  actualizarEstado(@Body() dto: ActualizarEstadoMesaDto) {
    return this.mesasService.actualizarEstadoMesa(dto);
  }
}