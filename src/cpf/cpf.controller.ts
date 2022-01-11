import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { AddCpfDto } from './dtos/add-cpf.dto';
import { FindCpfDto } from './dtos/find-cpf.dto';
import { RemoveCpfDto } from './dtos/remove-cpf.dto';

@Controller()
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post('/cpf')
  add(@Body() addCpfDto: AddCpfDto) {
    return this.cpfService.add(addCpfDto);
  }

  @Delete('/cpf/:cpf')
  remove(@Param() params: RemoveCpfDto) {
    return this.cpfService.remove(params);
  }

  @Get('/cpf/:cpf')
  findOne(@Param() params: FindCpfDto) {
    return this.cpfService.findOne(params);
  }

  @Get('/status')
  getStatus() {
    return this.cpfService.status();
  }
}
