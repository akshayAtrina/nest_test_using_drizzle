import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, JwtStrategy],
})
export class UserModule {}
