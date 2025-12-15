import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RolesResponseDto } from 'src/api/dto/roles/response/RolesResponse.dto';
import { IReporitoryRoles } from 'src/domain/interfaces/repository/roles.repository';
import { IRolesAppService } from 'src/domain/services/roles.interface';

@Injectable()
export class RolesService implements IRolesAppService {
    constructor(@Inject(IReporitoryRoles) private readonly rolesRepository: IReporitoryRoles) { }

    async Roles_Sellst(): Promise<RolesResponseDto[]> {
        try {
            return await this.rolesRepository.Roles_Sellst()
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
}
