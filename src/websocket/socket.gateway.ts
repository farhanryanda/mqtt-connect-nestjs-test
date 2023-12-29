import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MqttService } from 'src/mqtt.service';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly mqttService: MqttService) {
    this.mqttService.client.on('message', (topic, message) => {
      this.server.emit('message', message.toString());
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: string): void {
    this.mqttService.publish('event/', data);

    client.emit('message', data);
  }
}
