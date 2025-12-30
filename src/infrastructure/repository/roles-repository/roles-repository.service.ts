import { BadRequestException, Injectable } from '@nestjs/common';
import { AddRolesRequestDto } from 'src/api/dto/roles/request/AddRolesRequest.dto';
import { UpdRolesRequestDto } from 'src/api/dto/roles/request/UpdRolesRequest.dto';
import { RolesResponseDto } from 'src/api/dto/roles/response/RolesResponse.dto';
import { IReporitoryRoles } from 'src/domain/interfaces/repository/roles.repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class RolesRepositoryService implements IReporitoryRoles {

    constructor(private readonly prismaService: PrismaService) { }


    Roles_Ins(request: AddRolesRequestDto): Promise<RolesResponseDto> {
        throw new Error('Method not implemented.');
    }

    async Roles_Sellst(): Promise<RolesResponseDto[]> {
        try {
            return await this.prismaService.roles.findMany()
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
    
    Roles_GetRol(idrol: number): Promise<RolesResponseDto | null> {
        throw new Error('Method not implemented.');
    }
    Roles_Dtl(idrol: number): Promise<RolesResponseDto | null> {
        throw new Error('Method not implemented.');
    }
    Roles_Upd(request: UpdRolesRequestDto): Promise<RolesResponseDto> {
        throw new Error('Method not implemented.');
    }
}
