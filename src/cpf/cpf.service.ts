import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';
import { Repository } from 'typeorm';
import { AddCpfDto } from './dtos/add-cpf.dto';
import { FindCpfDto } from './dtos/find-cpf.dto';
import { RemoveCpfDto } from './dtos/remove-cpf.dto';
import { Blacklist } from './entities/blacklist.entity';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(Blacklist)
    private blacklistRepository: Repository<Blacklist>,
    private loggerService: LoggerService,
  ) {}

  removeMask(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  async add(addCpfDto: AddCpfDto) {
    const cpf = this.removeMask(addCpfDto.cpf);

    const hasInDb = await this.blacklistRepository.findOne({ cpf });

    if (hasInDb) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    return this.blacklistRepository.save({ cpf: addCpfDto.cpf });
  }

  async remove(removeCpfDto: RemoveCpfDto) {
    const cpf = this.removeMask(removeCpfDto.cpf);

    const hasInDb = await this.blacklistRepository.findOne({ cpf });

    if (!hasInDb) {
      throw new NotFoundException('CPF não encontrado.');
    }

    await this.blacklistRepository.delete({ cpf });
  }

  async findOne(findCpfDto: FindCpfDto) {
    const cpf = this.removeMask(findCpfDto.cpf);

    const isOnTheBlackList = await this.blacklistRepository.findOne({ cpf });

    return { message: isOnTheBlackList ? 'BLOCK' : 'FREE' };
  }

  async status() {
    const count = await this.blacklistRepository.count();

    const requestCount = this.loggerService.getRequestCount();

    return { uptime: process.uptime(), count, requestCount };
  }
}
