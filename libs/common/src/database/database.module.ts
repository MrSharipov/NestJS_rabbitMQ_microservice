import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: 'mongodb://mongo:27017/ordering_app',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
