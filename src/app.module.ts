import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AppController } from './app.controller';
import { SocketGateway } from './websocket/socket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MqttService, SocketGateway],
})
export class AppModule {}
