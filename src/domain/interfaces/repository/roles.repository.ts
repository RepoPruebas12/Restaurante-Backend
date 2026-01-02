import { AddRolesRequestDto } from "src/api/dto/roles/request/AddRolesRequest.dto"
import { UpdRolesRequestDto } from "src/api/dto/roles/request/UpdRolesRequest.dto"
import { RolesResponseDto } from "src/api/dto/roles/response/RolesResponse.dto"
import { RespuestasDto } from "src/domain/models/respuestas.dto"

export const IReporitoryRoles = Symbol('IReporitoryRoles')
export interface IReporitoryRoles {
    Roles_Ins(request: AddRolesRequestDto): Promise<RespuestasDto>
    Roles_Sellst(): Promise<RolesResponseDto[]>
    Roles_GetRol(idrol: number): Promise<RolesResponseDto | null>
    Roles_Dtl(idrol: number): Promise<RespuestasDto>
    Roles_Upd(request: UpdRolesRequestDto): Promise<RespuestasDto>
}