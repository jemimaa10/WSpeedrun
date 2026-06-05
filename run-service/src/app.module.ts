import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunsModule } from './runs/runs.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { PassportModule } from '@nestjs/passport'; // Tambahkan import ini
import { JwtModule } from '@nestjs/jwt';           // Tambahkan import ini
import { JwtStrategy } from './auth/strategies/jwt.strategies'; // Tambahkan import ini

@Module({
  imports: [
    PrismaModule, 
    RunsModule, 
    CommentsModule,
    // Daftarkan modul Passport dan JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // ⚠️ Catatan: String rahasia ini harus sama persis dengan Auth Service (Port 3000)
      secret: 'SECRET_KEY_SAMA_DENGAN_AUTH_SERVICE', 
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy, // <-- Daftarkan JwtStrategy di level root aplikasi
  ],
})
export class AppModule {}