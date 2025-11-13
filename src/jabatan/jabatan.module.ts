import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JabatanController } from './jabatan.controller';
import { JabatanService } from './jabatan.service';

@Module({
  controllers: [JabatanController],
  providers: [JabatanService, PrismaService]
})
export class JabatanModule {}
