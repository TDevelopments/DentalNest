import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppConfigModule } from './config/app/config.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresDatabaseProviderModule,
    AuthenticationModule,
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
