import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Module({
  exports: [LoggerService],
  providers: [LoggerService, LoggerMiddleware],
})
export class LoggerModule {}
