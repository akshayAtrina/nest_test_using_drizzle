import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from 'drizzle/database_module/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { UserWebsocketGateWay } from './gateway/user_websocket.gateway';

@Module({
  imports: [
    AuthModule,
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserWebsocketGateWay],
})
export class AppModule {}
