import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './api/module/roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // para no tener que importarlo en cada módulo
  }), RolesModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
