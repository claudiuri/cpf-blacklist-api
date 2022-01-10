import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCpfDto } from './dtos/add-cpf.dto';
import { BlackList } from './entities/black-list.entity';

@Injectable()
export class CpfService {
  constructor(
    @InjectRepository(BlackList)
    private blackListRepository: Repository<BlackList>,
  ) {}

  async add(addCpfDto: AddCpfDto) {
    const hasInDb = await this.blackListRepository.findOne({
      cpf: addCpfDto.cpf,
    });

    if (hasInDb) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    return this.blackListRepository.save({ cpf: addCpfDto.cpf });
  }
}
