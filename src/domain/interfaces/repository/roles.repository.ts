import { AddRolesRequestDto } from "src/api/dto/roles/request/AddRolesRequest.dto"
import { UpdRolesRequestDto } from "src/api/dto/roles/request/UpdRolesRequest.dto"
import { RolesResponseDto } from "src/api/dto/roles/response/RolesResponse.dto"

export const IReporitoryRoles = Symbol('IReporitoryRoles')
export interface IReporitoryRoles {
    Roles_Ins(request: AddRolesRequestDto): Promise<RolesResponseDto>
    Roles_Sellst(): Promise<RolesResponseDto[]>
    Roles_GetRol(idrol: number): Promise<RolesResponseDto | null>
    Roles_Dtl(idrol: number): Promise<RolesResponseDto | null>
    Roles_Upd(request: UpdRolesRequestDto): Promise<RolesResponseDto>
}