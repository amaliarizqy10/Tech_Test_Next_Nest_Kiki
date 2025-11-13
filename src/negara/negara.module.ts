import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NegaraController } from './negara.controller';
import { NegaraService } from './negara.service';

@Module({
  controllers: [NegaraController],
  providers: [NegaraService, PrismaService]
})
export class NegaraModule {}
