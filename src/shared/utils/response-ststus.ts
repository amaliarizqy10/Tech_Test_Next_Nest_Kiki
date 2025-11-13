import { HttpException, HttpStatus } from '@nestjs/common';
import { response } from 'express';

export function ResponseError(message: string, status: HttpStatus) {
  throw new HttpException(
    {
      statusCode: status,
      message,
    },
    status,
  ).getResponse();
}
