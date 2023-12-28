import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MqttService],
})
export class AppModule {}
