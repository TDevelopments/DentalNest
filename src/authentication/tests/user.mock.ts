import {
  User,
  UserGender,
  UserIdentity,
  UserRole,
} from 'src/users/entities/user.entity';

export const mockedUser: User = {
  id: 1,
  email: 'test@test.com',
  firstName: 'John',
  lastName: 'Doe',
  birthDate: new Date('2000-10-10'),
  genre: UserGender.MALE,
  identityType: UserIdentity.DNI,
  identityNumber: 29465162,
  phoneNumber1: 951623655,
  password: '11223346',
  role: UserRole.CLIENT,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};
