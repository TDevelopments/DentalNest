import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  genre: string;

  birthDate: Date;

  role: string;

  identityType: string;

  identityNumber: number;

  phoneNumber1: number;

  phoneNumber2: number;
}
