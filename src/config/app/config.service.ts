import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('app.port');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }

  get jwtExpirationTime(): number {
    return Number(this.configService.get<number>('app.jwtExpirationTime'));
  }

  get awsRegion(): string {
    return this.configService.get<string>('app.awsRegion');
  }

  get awsAccessKeyId(): string {
    return this.configService.get<string>('app.awsAccessKeyId');
  }

  get awsSecretAccessKey(): string {
    return this.configService.get<string>('app.awsSecretAccessKey');
  }

  get awsPublicBucketName(): string {
    return this.configService.get('app.awsPublicBucketName');
  }
}
