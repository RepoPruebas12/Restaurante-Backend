import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AddRolesRequestDto } from 'src/api/dto/roles/request/AddRolesRequest.dto';
import { UpdRolesRequestDto } from 'src/api/dto/roles/request/UpdRolesRequest.dto';
import { RolesResponseDto } from 'src/api/dto/roles/response/RolesResponse.dto';
import { IReporitoryRoles } from 'src/domain/interfaces/repository/roles.repository';
import { IRolesAppService } from 'src/domain/interfaces/services/roles.interface';

@Injectable()
export class RolesService implements IRolesAppService {
    constructor(@Inject(IReporitoryRoles) private readonly rolesRepository: IReporitoryRoles) { }
    async Roles_Dtl(idrol: number): Promise<RolesResponseDto | null> {
        const rolSearch = await this.rolesRepository.Roles_GetRol(idrol)
        if (!rolSearch) {
            throw new BadRequestException('El rol no existe en el sistema.')
        }

        const response = await this.rolesRepository.Roles_Dtl(idrol)

        if (response.idRespuesta == 0) {
            throw new BadRequestException(response.mensaje)
        }

        return rolSearch
    }

    async Roles_Upd(request: UpdRolesRequestDto): Promise<RolesResponseDto | null> {
        const rolSearch = await this.rolesRepository.Roles_GetRol(request.id)

        if (!rolSearch) {
            throw new BadRequestException('El rol no existe en el sistema.')
        }

        const response = await this.rolesRepository.Roles_Upd(request)
        if (response.idRespuesta == 0) {
            throw new BadRequestException(response.mensaje)
        }
        return await this.rolesRepository.Roles_GetRol(response.idRespuesta)
    }

    async Roles_Ins(request: AddRolesRequestDto): Promise<RolesResponseDto | null> {
        const response = await this.rolesRepository.Roles_Ins(request)
        if (response.idRespuesta == 0) {
            throw new BadRequestException(response.mensaje)
        }
        return await this.rolesRepository.Roles_GetRol(response.idRespuesta)
    }

    async Roles_GetRol(idrol: number): Promise<RolesResponseDto | null> {
        return await this.rolesRepository.Roles_GetRol(idrol)
    }

    async Roles_Sellst(): Promise<RolesResponseDto[]> {
        return await this.rolesRepository.Roles_Sellst()
    }
}
