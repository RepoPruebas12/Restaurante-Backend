import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosController } from 'src/api/controller/usuarios/usuarios.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
    // controllers: [UsuariosController],
    // imports: [PrismaService,
    //     JwtModule.register({
    //         global: true,
    //         secret: process.env.JWT_SECRET,
    //         signOptions: { expiresIn: '24h' },
    //     })
    // ]
})
export class UsuariosModule { }
