import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.['refreshtoken'] || null,
      ignoreExpiration: false,
      secretOrKey: 'REFRESH_SECRET_KEY', 
    });
  }

  async validate(payload: any) {
    // تایید اصالت رفرش‌توکن
    return { userId: payload.id };
  }
}