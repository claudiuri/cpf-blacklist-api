import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackList } from 'src/cpf/entities/black-list.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
