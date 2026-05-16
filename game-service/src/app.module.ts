import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { CategoriesModule } from './categories/categories.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PrismaModule, 
    GamesModule, 
    CategoriesModule,
    PassportModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY_BINUS',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}