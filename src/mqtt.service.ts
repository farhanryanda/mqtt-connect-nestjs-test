import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as moment from 'moment-timezone';
import { config } from 'dotenv';
config();
@Injectable()
export class MqttService {
  public client: mqtt.MqttClient;
  private timestamp = moment()
    .tz('Asia/Jakarta')
    .format('YYYY-MM-DD HH:mm:ss.SSS');

  constructor() {
    // get url & create client mqtt connetion
    const mqttUrl = process.env.MQTT_URL;
    this.client = mqtt.connect(mqttUrl);

    // Check Connection
    this.client.on('connect', () => {
      console.log('Connected to MQTT Server');
      // subscribe datapoint/# dan event/#
      this.client.subscribe('datapoint/#');
      // this.client.subscribe('event/#');
    });

    // handle message
    this.client.on('message', (topic, message) => {
      console.log(
        `Received message on topic [${topic}]: '${message}' || TIME: ${this.timestamp}`,
      );
    });
  }

  // publish message
  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
    console.log(
      `Published message to topic [${topic}]: '${message}' || TIME: ${this.timestamp}`,
    );
  }
}
