import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { registerdto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('register')
  async register(@Body() RegisterDto: registerdto) {
    return await this.authservice.register(RegisterDto);
  }
  @Post('login')
  async login(@Body() LoginDto: logindto) {
    return await this.authservice.login(LoginDto);
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Req() req: any) {
    return {
      message: 'you have access this page',
      user: req.user,
    };
  }
  @Post('refresh')
  async refresh(@Body() body:{refreshtoken:string}){
    return this.authservice.refresh(body.refreshtoken)
  }
}
