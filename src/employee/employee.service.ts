import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto, FindAllEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
    constructor(private prisma:PrismaService){ }

    async findAll(){
        return await this.prisma.karyawan.findMany()
    }

    async getAll(query: FindAllEmployeeDto){
    
        const response: {
            status: number;
            message: string;
            data: object[] | null;
            meta: object;
        } = {
            status: HttpStatus.OK,
            message: '',
            data: null,
            meta: {},
            };

        try {
        const { search, page = 1, limit = 20 } = query;

        const { skip, take } = {
            skip: (page - 1) * limit,
            take: Number(limit),
        };

        const [result, count] = await this.prisma.$transaction([
            this.prisma.karyawan.findMany({
            where: {
                OR: [
                { nama_karyawan: { contains: search, mode: 'insensitive' } },
                { code_karyawan: { contains: search, mode: 'insensitive' } },
                ],
                is_deleted: 0,
            },
            orderBy: {
                created_date: 'asc',
            },
            skip,
            take,
            }),
            this.prisma.karyawan.count({
            where: {
                OR: [
                { nama_karyawan: { contains: search, mode: 'insensitive' } },
                { code_karyawan: { contains: search, mode: 'insensitive' } },
                ],
                is_deleted: 0,
            },
            }),
        ]);

        const meta: {
            page: number;
            limit: number;
            total_data_page: number;
            total_data: number;
        } = {
            page: +page,
            limit: +limit,
            total_data_page: Math.ceil(count / limit),
            total_data: count ? count : 0,
        };

        response.message = 'Employees Data.';
        response.data = result;
        response.meta = meta;

        return response;
        } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (error instanceof Error) {
            response.message = error.message ?? 'Internal Server Error.';
        } else {
            response.message = 'Internal Server Error.';
        }

        return response;
        }
    }

    async delete(id: string, context) {
        const response: {
            status: number;
            message: string;
            data: object | null;
        } = {
            status: HttpStatus.OK,
            message: '',
            data: null,
        };

        try {
        const createdData = await this.prisma.karyawan.update({
            where: { id },
            data: { 
                is_deleted: 1,
                delete_by:context.username,
                delete_date : new Date()
            },
        });
        if (Object.keys(createdData).length < 1) {
            response.status = HttpStatus.BAD_REQUEST;
            response.message = 'Failed to delete.';
            response.data = null;
        } else {
            response.status = HttpStatus.OK;
            response.message = 'Data deleted successfully.';
            response.data = createdData;
        }
        } catch (error) {
        response.status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (error instanceof Error) {
            response.message = error.message ?? 'Internal Server Error.';
        } else {
            response.message = 'Internal Server Error.';
        }
        }

        return response;
    }

    async create(data: { name: string; code: string }, context) {
    const response: {
      status: number;
      message: string;
      data: object | null;
    } = {
      status: HttpStatus.OK,
      message: '',
      data: null,
    };

    try {
      const createdData = await this.prisma.karyawan.create({
        data: {
          code_karyawan: data.code,
          nama_karyawan: data.name,
          created_by: context.username,
        },
      });
      if (Object.keys(createdData).length < 1) {
        response.status = HttpStatus.BAD_REQUEST;
        response.message = 'Failed to store.';
        response.data = null;
      } else {
        response.status = HttpStatus.CREATED;
        response.message = 'Employee created successfully';
        response.data = createdData;
      }
    } catch (error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error instanceof Error) {
        response.message = error.message ?? 'Internal Server Error.';
      } else {
        response.message = 'Internal Server Error.';
      }
    }

    return response;
  }

  async update(id : string, body: CreateEmployeeDto, context) {
          try {
              const { name, code } = body
              let result = await this.prisma.karyawan.update({
                  data: {
                      nama_karyawan: name,
                      code_karyawan: code,
                      update_date: new Date(),
                      update_by: context.username
                  }, where: { id }
              })
              return {
                  status: HttpStatus.OK,
                  message: 'Successfully Update Company',
                  data: {
                      result: result,
                  }
              }
          } catch (error) {
              console.log(error)
  
              throw new InternalServerErrorException('Failed to update data company');
          }
      }
  


}
