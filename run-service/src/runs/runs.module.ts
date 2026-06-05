import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsController } from './runs.controller';
import { RunAdminService } from './run-admin.service';       // Tambahkan import ini
import { RunAdminController } from './run-admin.controller'; // Tambahkan import ini
import { PrismaModule } from '../prisma/prisma.module';       // Tambahkan import ini

@Module({
  imports: [PrismaModule], // Daftarkan PrismaModule agar koneksi DB aktif di folder ini
  controllers: [
    RunsController, 
    RunAdminController // <-- Daftarkan Controller Admin di sini
  ],
  providers: [
    RunsService, 
    RunAdminService    // <-- Daftarkan Service Admin di sini
  ],
})
export class RunsModule {}