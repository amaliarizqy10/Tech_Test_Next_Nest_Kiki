import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegaraModule } from './negara/negara.module';
import { JabatanModule } from './jabatan/jabatan.module';
import { KotaModule } from './kota/kota.module';
import { CompanyModule } from './company/company.module';
import { ProvinsiModule } from './provinsi/provinsi.module';
import { UsersModule } from './employee/employee.module';

@Module({
  imports: [AuthModule, NegaraModule, KotaModule, ProvinsiModule, JabatanModule, CompanyModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}