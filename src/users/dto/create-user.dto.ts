export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  genre: string;
  birthDate: Date;
  role: string;
  identityType: string;
  identityNumber: number;
  phoneNumber1: number;
  phoneNumber2: number;
}
