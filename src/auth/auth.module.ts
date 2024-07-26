import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserWebsocketGateWay } from 'src/gateway/user_websocket.gateway';

@Module({
  imports: [JwtModule.register({})],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserWebsocketGateWay],
})
export class AuthModule {}
