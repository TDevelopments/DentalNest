import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get('POSTGRES_HOST');
  }

  get port(): number {
    return this.configService.get<number>('POSTGRES_PORT');
  }

  get username(): string {
    return this.configService.get('POSTGRES_USER');
  }

  get password(): string {
    return this.configService.get('POSTGRES_PASSWORD');
  }

  get database(): string {
    return this.configService.get('POSTGRES_DB');
  }
}
