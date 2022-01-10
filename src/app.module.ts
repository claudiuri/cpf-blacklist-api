import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpf/cpf.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
