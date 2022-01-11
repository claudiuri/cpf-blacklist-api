import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpf/cpf.module';
import { StatusService } from './status/status.service';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    CpfModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService, StatusService],
})
export class AppModule {}
