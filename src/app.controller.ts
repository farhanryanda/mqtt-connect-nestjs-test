import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly mqttService: MqttService) {}
  @Post('message')
  publishMessage(@Req() req: Request, @Res() res: Response): void {
    this.mqttService.publish('datapoint/', req.body.message);
    res.send('Message Published');
  }

  @Post('event')
  publishEvent(@Req() req: Request, @Res() res: Response): void {
    this.mqttService.publish('event/', req.body.message);
    res.send('Message Published');
  }
}
