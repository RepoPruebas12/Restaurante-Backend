import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // para no tener que importarlo en cada módulo
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
