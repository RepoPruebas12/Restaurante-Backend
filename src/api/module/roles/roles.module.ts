import { Module } from '@nestjs/common';
import { RolesController } from 'src/api/controller/roles/roles.controller';
import { RolesService } from 'src/application/services/roles/roles.service';
import { IReporitoryRoles } from 'src/domain/interfaces/repository/roles.repository';
import { IRolesAppService } from 'src/domain/interfaces/services/roles.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { RolesRepositoryService } from 'src/infrastructure/repository/roles-repository/roles-repository.service';

@Module({
    controllers: [RolesController],
    providers: [PrismaService,
        {
            provide: IRolesAppService,
            useClass: RolesService
        },
        {
            provide: IReporitoryRoles,
            useClass: RolesRepositoryService
        }
    ]
})
export class RolesModule { }
