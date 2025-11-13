import { Module } from '@nestjs/common';
import { ProvinsiController } from './provinsi.controller';
import { ProvinsiService } from './provinsi.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProvinsiController],
  providers: [ProvinsiService, PrismaService]
})
export class ProvinsiModule {}
