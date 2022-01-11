import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpf/cpf.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    CpfModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
