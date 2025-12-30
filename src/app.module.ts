import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './api/module/roles/roles.module';
import { UsuariosModule } from './api/module/usuarios/usuarios.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // para no tener que importarlo en cada módulo
  }), RolesModule, UsuariosModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
