import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { PostgresConfigModule } from 'src/config/database/postgres/config.module';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';
import { PostgresDatabaseProviderModule } from 'src/providers/database/postgres/provider.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthenticationService } from '../authentication.service';
import { AccessTokenDto } from '../dto/access-token.dto';
import { mockedUser } from './user.mock';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let usersService: UsersService;
  let findOne: jest.Mock;
  let findUser: jest.Mock;
  let userData: User;

  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    findOne = jest.fn();
    findUser = jest.fn().mockResolvedValue(userData);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppConfigModule,
        JwtModule.registerAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: async (appConfigService: AppConfigService) => ({
            secret: appConfigService.jwtSecret,
            signOptions: {
              expiresIn: `${appConfigService.jwtExpirationTime}s`,
            },
          }),
        }),
      ],
      providers: [
        AuthenticationService,
        UsersService,
        { provide: getRepositoryToken(User), useValue: { findOne: findUser } },
      ],
    }).compile();

    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
    usersService = module.get<UsersService>(UsersService);
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findUser.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const fetchedUser = await usersService.findByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findUser.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.findByEmail('test@test.com'),
        ).rejects.toThrow();
      });
    });
  });

  describe('Cuando iniciamos el servicio', () => {
    it('should be defined', () => {
      expect(authenticationService).toBeDefined();
    });
  });

  describe('when create a jwt', () => {
    it('should return a string', () => {
      const user = new User();
      user.id = 1;
      expect(typeof authenticationService.getAcessToken(user)).toEqual(
        'string',
      );
    });
  });
});
