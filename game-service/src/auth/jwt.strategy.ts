// untuk mengekstrak data user (terutama role) dari token

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // src/auth/jwt.strategy.ts
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'SUPER_SECRET_KEY_BINUS', // Paksa langsung string ini tanpa process.env dulu sementara waktu
    });
  }

  async validate(payload: any) {
    // Payload ini berisi data yang di-encode saat login di Auth Service
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}