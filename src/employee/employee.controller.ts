import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/shared/utils/constant';
import { JoiPipe } from 'nestjs-joi';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, FindAllEmployeeDto } from './dto/employee.dto';

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
    delete(@Param('id') id: string) {
        return this.employeeService.delete(id);
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create a new Employee' })
    @ApiResponse({ status: 201, description: 'Employee created successfully.' })
    create(@Body() dto: CreateEmployeeDto) {
        return this.employeeService.create(dto);
    }
}
