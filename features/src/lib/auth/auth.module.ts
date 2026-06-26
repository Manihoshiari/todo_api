import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { TestUser } from 'entity/src/lib/test.entity';
import {tasksEntity} from 'entity/src/lib/tasks.entity'
import {tokensEntity} from 'entity/src/lib/tokens.entitiy'
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './refresh.strategy';
@Module({
  imports:[TypeOrmModule.forFeature([TestUser,tasksEntity,tokensEntity]),
PassportModule.register({defaultStrategy:'jwt'}),
JwtModule.register({
  secret:'access_token',
  signOptions:{expiresIn:10}
})
],
  providers: [AuthService,JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController  ],
  exports:[JwtModule,PassportModule,AuthService]
})
export class AuthModule {}
