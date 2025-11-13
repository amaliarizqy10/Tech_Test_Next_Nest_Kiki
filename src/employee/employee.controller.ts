import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { JoiPipe } from 'nestjs-joi';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, FindAllEmployeeDto } from './dto/employee.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth';

@ApiBearerAuth()
@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Public()
    @Get('/getAll')
    async findAll(){
        return this.employeeService.findAll();
    }

    @Get('/findEmployee')
    async getAll(@Query(JoiPipe) query: FindAllEmployeeDto){
        return this.employeeService.getAll(query);
    }

    @Delete('/remove/:id')
    @ApiOperation({ summary: 'Delete a Employee' })
    delete(@Param('id') id: string, @Req() context: Request) {
        const data = (context as any)?.user ?? '';
        return this.employeeService.delete(id, data);
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create a new Employee' })
    @ApiResponse({ status: 201, description: 'Employee created successfully.' })
    create(@Body() dto: CreateEmployeeDto, @Req() context: Request) {
        const data = (context as any)?.user ?? '';
        return this.employeeService.create(dto, data);
    }

    @ApiBearerAuth()
    @Patch('/update/:id')
    async update(
        @Param('id') id: string,
        @Body() dto: CreateEmployeeDto,
        @Req() context: Request
    ) {
        const data = (context as any)?.user ?? '';
        return this.employeeService.update(id, dto, data)
    }

    @ApiBearerAuth()
    @Get('getReportEmployee')
    async getReportEmployee() {
        return this.employeeService.getReportEmployee();
    }
}
