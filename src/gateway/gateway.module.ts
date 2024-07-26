import { Module } from '@nestjs/common';
import { UserWebsocketGateWay } from './user_websocket.gateway';

@Module({ providers: [UserWebsocketGateWay] })
export class GatewayModule {}
