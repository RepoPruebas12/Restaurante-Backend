import { BadRequestException, Controller, Get, HttpStatus, Inject, Logger, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { IRolesAppService } from 'src/domain/services/roles.interface';

@Controller('roles')
export class RolesController {

    private readonly logger = new Logger(RolesController.name)
    constructor(@Inject(IRolesAppService) private readonly rolesServices: IRolesAppService) { }


    @Get('/list-rols')
    @ApiOperation({
        summary: 'Lista de roles',
        description: `
    Types
    {
        "exito":boolean,
        "mensajeError":string,
        "_roles":Roles[]
    }
    Description
    {
        "exito":Indicador de exito,
        "mensajeError":Mensaje de Error,
        "_roles":Lista de los roles
    }
        `
    })
    async roles_sellst(@Res() res: Response) {
        try {
            this.logger.log(`Listar los roles`)
            const roles = await this.rolesServices.Roles_Sellst()
            return res.status(HttpStatus.OK).json({
                "exito": true,
                "mensajeError": '',
                "_habilidades": roles
            })

        } catch (err) {
            if (err instanceof BadRequestException) {
                this.logger.error(`Fallo en la respuestas: ${err.message}`)

                return res.status(HttpStatus.BAD_REQUEST).json({
                    "exito": false,
                    "mensajeError": err.message
                })
            }

            this.logger.error('Error inesperado')
            return res.status(HttpStatus.BAD_REQUEST).json({
                "exito": false,
                "mensajeError": 'Ocurrio algo inesperado'
            })
        }
    }

}
