import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Logger, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { AddRolesRequestDto } from 'src/api/dto/roles/request/AddRolesRequest.dto';
import { UpdRolesRequestDto } from 'src/api/dto/roles/request/UpdRolesRequest.dto';
import { IRolesAppService } from 'src/domain/interfaces/services/roles.interface';

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
                "_roles": roles
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


    @Get('/get-rols/:id')
    @ApiOperation({
        summary: 'Buscar rol',
        description: `
    Types
    {
        "exito":boolean,
        "mensajeError":string,
        "_rol":Roles
    }
    Description
    {
        "exito":Indicador de exito,
        "mensajeError":Mensaje de Error,
        "_rol":Lista el rol
    }
        `
    })
    async roles_sel(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            this.logger.log(`Buscar rol`)
            const roles = await this.rolesServices.Roles_GetRol(id)
            return res.status(HttpStatus.OK).json({
                "exito": true,
                "mensajeError": '',
                "_rol": roles
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

    @Post('/add-rols')
    @ApiOperation({
        summary: 'Registrar rol',
        description: `
    Types
    {
        "exito":boolean,
        "mensajeError":string,
        "_rol":Roles
    }
    Description
    {
        "exito":Indicador de exito,
        "mensajeError":Mensaje de Error,
        "_rol":Lista el rol
    }
        `
    })
    async roles_inst(@Body() request: AddRolesRequestDto, @Res() res: Response) {
        try {
            this.logger.log(`Registrar rol`)
            const roles = await this.rolesServices.Roles_Ins(request)
            return res.status(HttpStatus.OK).json({
                "exito": true,
                "mensajeError": '',
                "_rol": roles
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


    @Put('/upd-rols')
    @ApiOperation({
        summary: 'Actualizar rol',
        description: `
    Types
    {
        "exito":boolean,
        "mensajeError":string,
        "_rol":Roles
    }
    Description
    {
        "exito":Indicador de exito,
        "mensajeError":Mensaje de Error,
        "_rol":Lista el rol
    }
        `
    })
    async roles_upd(@Body() request: UpdRolesRequestDto, @Res() res: Response) {
        try {
            this.logger.log(`Actualizar rol`)
            const roles = await this.rolesServices.Roles_Upd(request)
            return res.status(HttpStatus.OK).json({
                "exito": true,
                "mensajeError": '',
                "_rol": roles
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

    @Delete('/dlt-rols/:id')
    @ApiOperation({
        summary: 'Eliminar rol',
        description: `
    Types
    {
        "exito":boolean,
        "mensajeError":string,
        "_rol":Roles
    }
    Description
    {
        "exito":Indicador de exito,
        "mensajeError":Mensaje de Error,
        "_rol":Lista el rol
    }
        `
    })
    async roles_dlt(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            this.logger.log(`Eliminar rol`)
            const roles = await this.rolesServices.Roles_Dtl(id)
            return res.status(HttpStatus.OK).json({
                "exito": true,
                "mensajeError": '',
                "_rol": roles
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
