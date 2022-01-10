import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpf/cpf.module';

@Module({
  imports: [CpfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
