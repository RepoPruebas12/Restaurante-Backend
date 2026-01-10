import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MesasController } from './controllers/mesas.controller';
import { MesasService } from './service/mesas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MesasController],
  providers: [MesasService],
})
export class MesasModule {}