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
import { AuthGuard } from '@nestjs/passport';
import { Request, Response, response } from 'express';
import { JwtAuthGuard } from './jwt.gaurd';
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('register')
  async register(@Body() RegisterDto: registerdto) {
    return await this.authservice.register(RegisterDto);
  }
  @Post('login')
  async login(@Body() LoginDto: logindto ,@Res({passthrough:true})response:Response) {
    
    return await this.authservice.login(LoginDto,response);
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
  async refresh(@Body() body:{refreshtoken:string},@Res() response:Response,@Req() request:Request){
    const refreshtoken=request.cookies['refreshtoken']
    if(!refreshtoken){
      throw new UnauthorizedException('there is no refresh token')
    }
    const tokens=this.authservice.refresh(refreshtoken)
    response.cookie('refreshtoken',(await tokens).refreshtoken,{
      httpOnly:true,
      secure:false,
      maxAge:1000*360*24*15,
      sameSite:'lax'
    })

    return this.authservice.refresh((await tokens).accesToken)
  }
}
