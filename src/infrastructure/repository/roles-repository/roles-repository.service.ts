import { BadRequestException, Injectable } from '@nestjs/common';
import { AddRolesRequestDto } from 'src/api/dto/roles/request/AddRolesRequest.dto';
import { UpdRolesRequestDto } from 'src/api/dto/roles/request/UpdRolesRequest.dto';
import { RolesResponseDto } from 'src/api/dto/roles/response/RolesResponse.dto';
import { IReporitoryRoles } from 'src/domain/interfaces/repository/roles.repository';
import { RespuestasDto } from 'src/domain/models/respuestas.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class RolesRepositoryService implements IReporitoryRoles {

    constructor(private readonly prismaService: PrismaService) { }
    async Roles_Ins(request: AddRolesRequestDto): Promise<RespuestasDto> {
        let respuesta: RespuestasDto = {
            idRespuesta: 0,
            mensaje: ''
        }
        try {
            const rol = await this.prismaService.roles.create({
                data: {
                    nombre: request.rol
                }
            })
            respuesta.idRespuesta = rol.id
            respuesta.mensaje = 'Rol creado correctamente.'
        } catch (err) {
            respuesta.idRespuesta = 0
            respuesta.mensaje = err || 'Error al crear el rol'
        }

        return respuesta
    }

    async Roles_Dtl(idrol: number): Promise<RespuestasDto> {
        let respuesta: RespuestasDto = {
            idRespuesta: 0,
            mensaje: ''
        }
        try {
            const rol = await this.prismaService.roles.delete({
                where: {
                    id: idrol
                }
            })
            respuesta.idRespuesta = rol.id
            respuesta.mensaje = 'Rol eliminado correctamente.'
        } catch (err) {
            respuesta.idRespuesta = 0
            respuesta.mensaje = err || 'Error al eliminar el rol'
        }

        return respuesta
    }

    async Roles_Upd(request: UpdRolesRequestDto): Promise<RespuestasDto> {
        let respuesta: RespuestasDto = {
            idRespuesta: 0,
            mensaje: ''
        }
        try {
            const rol = await this.prismaService.roles.update({
                data: {
                    nombre: request.rol
                },
                where: {
                    id: request.id
                }
            })
            respuesta.idRespuesta = rol.id
            respuesta.mensaje = 'Rol editado correctamente.'
        } catch (err) {
            respuesta.idRespuesta = 0
            respuesta.mensaje = err || 'Error al editar el rol'
        }

        return respuesta
    }

    async Roles_Sellst(): Promise<RolesResponseDto[]> {
        try {
            return await this.prismaService.roles.findMany()
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async Roles_GetRol(idrol: number): Promise<RolesResponseDto | null> {
        let rolGet: RolesResponseDto | null = null
        try {

            const rol = await this.prismaService.roles.findFirst({
                where: {
                    id: idrol
                }
            })

            if (rol) {
                rolGet = {
                    id: rol.id,
                    nombre: rol.nombre
                }
            }

        } catch (err) {
            throw new BadRequestException(err)
        }
        return rolGet
    }

}
