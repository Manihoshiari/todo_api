import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from 'entity/src/lib/test.entity';
import { Repository } from 'typeorm';
import { registerdto } from './dto/register.dto';
import { logindto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { tokensEntity } from 'entity/src/lib/tokens.entitiy';
import { Response } from 'express';

@Injectable()
export class AuthService {
  argon = require('argon2');
  constructor(
    @InjectRepository(TestUser)
    private repository: Repository<TestUser>,
    @InjectRepository(tokensEntity)
    private tokenrepository: Repository<tokensEntity>,
    private readonly jwtservice: JwtService,
  ) {}
  async generatetoken(user: TestUser) {
    const payload = { id: user.id };
    const accesToken = this.jwtservice.sign(payload, {
      secret: 'access_token',
      expiresIn: '15m',
    });
    const refreshtoken = this.jwtservice.sign(payload, {
      secret: 'refresh_token',
      expiresIn: '7d',
    });
    return { accesToken, refreshtoken };
  }
  async register(dtoregister: registerdto) {
    const userexist = await this.repository.existsBy({
      email: dtoregister.email,
    });
    if (userexist) {
      throw new UnauthorizedException('this email is already exist');
    }
    const usernameExist = await this.repository.existsBy({
      name: dtoregister.name,
    });
    if (usernameExist) {
      throw new UnauthorizedException('username choosed before');
    }

    const hashPass = await this.argon.hash(dtoregister.password);
    const newuser = this.repository.create({
      email: dtoregister.email,
      password: hashPass,
      name: dtoregister.name,
    });
    await this.repository.save(newuser);
    return {
      success: true,
      message: 'your register is successful',
      token: this.generatetoken(newuser),
    };
  }
  async login(dtologin: logindto, response: Response) {
    const user = await this.repository.findOne({
      where: { name: dtologin.name },
      select: { id: true, name: true, password: true, email: true },
    });
    const userToken = await this.repository.findOne({
      where: { name: dtologin.name },
    });
    const token = await this.generatetoken(user!);

    if (!user?.id) {
      throw new UnauthorizedException();
    }
    const newToken = await this.tokenrepository.create({
      refreshToken: token.refreshtoken,
      acssesToken: token.accesToken,
      user,
    });
    this.tokenrepository.save(newToken);
    const result = await this.argon.verify(user?.password, dtologin.password);
    response.cookie('refreshtoken', token.refreshtoken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 360 * 1000,
    });
    if (result) {
      return {
        success: true,
        token: (await this.generatetoken(user!)).accesToken,
        message: 'you are entered successfuly',
        user: {
          name: user?.name,
          id: user?.id,
          email: user?.email,
        },
      };
    } else if (!user || !result) {
      throw new UnauthorizedException('email or password is wrong');
    }
  }
  async refresh(token: string) {
    const payload = this.jwtservice.verify(token, {
      secret: 'refresh_token',
    });

    const user = await this.repository.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('no user');
    }
    if (!token) {
      throw new UnauthorizedException('no token');
    }
    return this.generatetoken(user);
  }
}
