import { number } from '@hapi/joi';
import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseException extends HttpException {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({
    example: 'Internal Server Error',
  })
  message: string;

  constructor(statusCode: number, message: string) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.message = message;
  }
}
