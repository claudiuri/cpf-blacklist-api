import { Module } from '@nestjs/common';
import { CpfController } from './cpf.controller';
import { CpfService } from './cpf.service';

@Module({
  controllers: [CpfController],
  providers: [CpfService],
})
export class CpfModule {}
