import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlackList } from 'src/cpf/entities/black-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(BlackList)
    private blackListRepository: Repository<BlackList>,
  ) {}

  async getStatus() {
    const numberOfCpfs = await this.blackListRepository.count();

    return { uptime: new Date(), numberOfCpfs };
  }
}
