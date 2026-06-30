import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { registerdto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';
import { Request, Response, response } from 'express';
import { JwtAuthGuard } from './jwt.gaurd';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('register')
  async register(@Body() RegisterDto: registerdto) {
    return await this.authservice.register(RegisterDto);
  }
  @Post('login')
  async login(
    @Body() LoginDto: logindto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authservice.login(LoginDto, response);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: any) {
    return {
      message: 'you have access this page',
      user: req.user,
    };
  }
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return await this.authservice.saverefresh(request, response);
  }
}
