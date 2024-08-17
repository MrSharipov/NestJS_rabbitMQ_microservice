import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configServie: ConfigService) {}
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configServie.get<string>('RABBIT_MQ_URL')],
        queue: this.configServie.get<string>(`RABBIT_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }
}
