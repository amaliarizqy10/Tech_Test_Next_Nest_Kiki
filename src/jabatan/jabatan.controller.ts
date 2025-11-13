import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { JabatanService } from './jabatan.service';

@ApiBearerAuth()
@Controller('jabatan')
export class JabatanController {
    constructor(private jabatanservice: JabatanService) { }

    @Public()
    @Get('getAll')
    async getAll(){
        return this.jabatanservice.getAll();
    }


}
