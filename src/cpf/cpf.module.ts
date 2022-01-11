import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { LoggerModule } from 'src/logger/logger.module';
import { CpfController } from './cpf.controller';
import { CpfService } from './cpf.service';
import { Blacklist } from './entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist]), LoggerModule],
  controllers: [CpfController],
  providers: [CpfService],
})
export class CpfModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cpf', method: RequestMethod.POST },
        { path: 'cpf', method: RequestMethod.DELETE },
        { path: 'status', method: RequestMethod.GET },
      )
      .forRoutes(CpfController);
  }
}
