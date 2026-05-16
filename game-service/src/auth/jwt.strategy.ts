// untuk mengekstrak data user (terutama role) dari token

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    
    super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: 'SUPER_SECRET_KEY_BINUS', 
    });
  }

  async validate(payload: any) {
   
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}