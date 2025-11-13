import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { NegaraService } from './negara.service';

@ApiBearerAuth()
@Controller('negara')
export class NegaraController {
    constructor(private negaraService: NegaraService) { }

    @Public()
    @Get('getAll')
    async getAll(){
        return this.negaraService.getAll();
    }


}
