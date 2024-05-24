import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomGateway } from './room/room.gateway';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test")
          .default("development"),
        PORT: Joi.number().required(),
        WEB_URL: Joi.string().required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoomGateway],
})
export class AppModule {}
