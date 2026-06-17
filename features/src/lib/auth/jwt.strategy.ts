import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from 'entity/src/lib/test.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TestUser)
    private readonly repository: Repository<TestUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'access_token',
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
