import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mw21ytre34#_4',
    });
  }

  async validate(payload: any) {
    console.log('my decode bearer token is ', payload);
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
