import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Public } from 'src/shared/utils/constant';
import { CreateCompanyDto, FindAllCompaniesDto } from './dto/company.dto';
import { JoiPipe } from 'nestjs-joi';
import { JwtAuthGuard } from 'src/guards/jwt-auth';

@ApiBearerAuth()
@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Public()
    @Get('/getAll')
    async findAll(){
        return this.companyService.findAll();
    }

    @Get('/findCompany')
    async getAll(@Query(JoiPipe) query: FindAllCompaniesDto){
        return this.companyService.getAll(query);
    }

    @Delete('/remove/:id')
    @ApiOperation({ summary: 'Delete a company' })
    delete(@Param('id') id: string, @Req() context: Request) {
        const data = (context as any)?.user ?? '';
        return this.companyService.delete(id, data);
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({ status: 201, description: 'Company created successfully.' })
    create(@Body() dto: CreateCompanyDto, @Req() context: Request) {
         const data = (context as any)?.user ?? '';
        return this.companyService.create(dto,data);
    }

    @ApiBearerAuth()
    @Patch('/update/:id')
    async update(
        @Param('id') id: string,
        @Body() dto: CreateCompanyDto,
        @Req() context: Request
    ) {
        const data = (context as any)?.user ?? '';
        return this.companyService.update(id, dto, data)
    }
}
