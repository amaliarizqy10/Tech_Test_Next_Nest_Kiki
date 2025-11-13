import { ApiProperty } from "@nestjs/swagger"
import { IsArray, isArray, IsNotEmpty, IsString } from "class-validator"
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class LoginAuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    password: string
}

export class RegisterAuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    fullName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @JoiSchema(
        Joi.array().required()
    )
    jabatanId: []

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @JoiSchema(
        Joi.array().required()
    )
    companyId: []

    @ApiProperty()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    nomorTelp: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(
        Joi.string().required()
    )
    address: string

    @ApiProperty()
    kotaId: string

    @ApiProperty()
    provinsiId: string

    @ApiProperty()
    negaraId: string
}