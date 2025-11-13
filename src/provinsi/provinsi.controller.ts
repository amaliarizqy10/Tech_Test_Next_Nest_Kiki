import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { ProvinsiService } from './provinsi.service';

@ApiBearerAuth()
@Controller('provinsi')
export class ProvinsiController {
    constructor(private provinsiService: ProvinsiService) { }

    @Public()
    @Get('getAll')
    async getAll(){
        return this.provinsiService.getAll();
    }


}
