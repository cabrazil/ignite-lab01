import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'purchases',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    });
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  async onModuleInit() {
    await this.connect();
  }

  async OnModuleDestroy() {
    await this.close();
  }
}
