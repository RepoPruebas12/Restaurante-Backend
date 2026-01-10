import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './service/productos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}