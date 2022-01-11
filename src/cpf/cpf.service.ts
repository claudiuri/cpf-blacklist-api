import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { AddCpfDto } from './dtos/add-cpf.dto';
import { FindCpfDto } from './dtos/find-cpf.dto';
import { RemoveCpfDto } from './dtos/remove-cpf.dto';
import { BlackList } from './entities/black-list.entity';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(BlackList)
    private blackListRepository: Repository<BlackList>,
    private loggerService: LoggerService,
  ) {}

  removeMask(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  async add(addCpfDto: AddCpfDto) {
    const cpf = this.removeMask(addCpfDto.cpf);

    const hasInDb = await this.blackListRepository.findOne({ cpf });

    if (hasInDb) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    return this.blackListRepository.save({ cpf: addCpfDto.cpf });
  }

  async remove(removeCpfDto: RemoveCpfDto) {
    const cpf = this.removeMask(removeCpfDto.cpf);

    const hasInDb = await this.blackListRepository.findOne({ cpf });

    if (!hasInDb) {
      throw new NotFoundException('CPF não encontrado.');
    }

    await this.blackListRepository.delete({ cpf });
  }

  async findOne(findCpfDto: FindCpfDto) {
    const cpf = this.removeMask(findCpfDto.cpf);

    const isOnTheBlackList = await this.blackListRepository.findOne({ cpf });

    return { message: isOnTheBlackList ? 'BLOCK' : 'FREE' };
  }

  async status() {
    const count = await this.blackListRepository.count();

    const requestCount = this.loggerService.getRequestCount();

    return { uptime: new Date(), count, requestCount };
  }
}
