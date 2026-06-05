import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Membaca 'Authorization: Bearer <token>'
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY_BINUS', // WAJIB SAMA dengan secret key di Auth Service
    });
  }

  async validate(payload: any) {
    // Menghasilkan objek req.user yang berisi id dan role [cite: 62]
    return { userId: payload.id, role: payload.role }; 
  }
}