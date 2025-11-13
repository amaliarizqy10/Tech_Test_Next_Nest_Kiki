import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { KotaController } from './kota.controller';
import { KotaService } from './kota.service';

@Module({
  controllers: [KotaController],
  providers: [KotaService, PrismaService]
})
export class KotaModule {}
