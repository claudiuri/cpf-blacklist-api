import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { IsCPF } from 'brazilian-class-validator';
import { CpfService } from './cpf.service';
import { AddCpfDto } from './dtos/add-cpf.dto';

@Controller('cpf')
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post()
  add(@Body() addCpfDto: AddCpfDto) {
    return this.cpfService.add(addCpfDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.cpfService.remove(cpf);
  }
}
