import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfController } from './cpf.controller';
import { CpfService } from './cpf.service';
import { BlackList } from './entities/black-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList])],
  controllers: [CpfController],
  providers: [CpfService],
})
export class CpfModule {}
