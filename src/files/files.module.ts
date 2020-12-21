import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app/config.module';
import PublicFile from 'src/models/publicFile.entity';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), AppConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
