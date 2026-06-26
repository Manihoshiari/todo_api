import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
   super({
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: Request) => req?.cookies?.['refreshtoken'],
  ]),
  secretOrKey: 'refresh_token',
  ignoreExpiration: false,
});
  }

  async validate(payload: any) {

    return { userId: payload.id };
  }
}