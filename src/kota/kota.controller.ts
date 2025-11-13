import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { KotaService } from './kota.service';

@ApiBearerAuth()
@Controller('kota')
export class KotaController {
    constructor(private kotaService: KotaService) { }

    @Public()
        @Get('getAll')
    async getAll(){
        return this.kotaService.getAll();
    }


}
