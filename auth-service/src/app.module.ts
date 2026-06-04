import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'WSpeedrun/auth-service/.env', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}