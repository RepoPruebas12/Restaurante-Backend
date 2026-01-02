import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
  ],
=======
import { RolesModule } from './api/module/roles/roles.module';
import { UsuariosModule } from './api/module/usuarios/usuarios.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // para no tener que importarlo en cada módulo
  }), RolesModule, UsuariosModule,],
  controllers: [],
  providers: [],
>>>>>>> 6694363893e79f8fa32ed91b15cc439dd4f6588f
})
export class AppModule {}