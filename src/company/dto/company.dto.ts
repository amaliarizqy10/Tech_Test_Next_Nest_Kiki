import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class FindAllCompaniesDto {
  @ApiPropertyOptional()
  @JoiSchema(Joi.string().default(' '))
  search: string;

  @ApiPropertyOptional()
  @JoiSchema(Joi.number())
  page: number = 1;

  @ApiPropertyOptional()
  @JoiSchema(Joi.number())
  limit: number = 20;
}

export class CreateCompanyDto {
  @ApiProperty({ example: 'FHR001' })
  @JoiSchema(Joi.string().min(2).max(100).required())
  code: string;

  @ApiProperty({ example: 'Arsifa' })
  @JoiSchema(Joi.string().min(2).max(100).required())
  name: string;
}