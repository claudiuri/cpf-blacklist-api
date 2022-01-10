import { Body, Controller, Post } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { AddCpfDto } from './dtos/add-cpf.dto';

@Controller('cpf')
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post()
  add(@Body() addCpfDto: AddCpfDto) {
    return this.cpfService.add(addCpfDto);
  }
}
