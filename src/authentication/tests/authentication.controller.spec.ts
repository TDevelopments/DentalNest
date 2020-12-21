import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationController } from '../authentication.controller';
import { AuthenticationService } from '../authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
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
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        AuthenticationService,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
