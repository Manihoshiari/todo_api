import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
override canActivate(context: ExecutionContext) {
    console.log('--- GUARD STEP 1: Request reached JwtAuthGuard ---');
    const request = context.switchToHttp().getRequest();
    
    // Check if cookie-parser is working
    console.log('--- GUARD STEP 2: Raw Cookies in Request:', request.cookies);
    
    return super.canActivate(context); // This triggers JwtStrategy
  }

  // 2. This runs after Passport finishes checking the token
  override handleRequest(err: any, user: any, info: any) {
    console.log('--- GUARD STEP 3: Passport Result ---');
    console.log('Passport Error:', err);
    console.log('Passport User:', user);
    console.log('Passport Info/Reason:', info?.message);
    
    if (err || !user) {
      console.error('--- GUARD STEP 4: Access Denied! Issuing 401 ---');
      throw err || new UnauthorizedException('Unauthorized access detected by Guard');
    }
    
    return user;
  }
}