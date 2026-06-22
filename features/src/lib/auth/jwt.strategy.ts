import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { TestUser } from 'entity/src/lib/test.entity';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TestUser)
    private readonly repository: Repository<TestUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req:Request)=>{

          return req?.cookies?.['refreshtoken']
        }
      ]),
      ignoreExpiration: false,
      secretOrKey:
        'refresh_token',
    });
  }
  async validate(payload: any) {
    const user = await this.repository.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException('not validate');
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}
