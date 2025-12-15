import { RolesResponseDto } from "src/api/dto/roles/response/RolesResponse.dto"

export const IRolesAppService = Symbol('IRolesAppService')
export interface IRolesAppService {
    Roles_Sellst(): Promise<RolesResponseDto[]>
}