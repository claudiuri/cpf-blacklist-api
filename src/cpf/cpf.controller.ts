import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CpfService } from './cpf.service';
import { AddCpfDto } from './dtos/add-cpf.dto';
import { FindCpfDto } from './dtos/find-cpf.dto';
import { RemoveCpfDto } from './dtos/remove-cpf.dto';

@ApiTags('cpf')
@Controller()
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post('/cpf')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'The cpf is invalid.' })
  add(@Body() addCpfDto: AddCpfDto) {
    return this.cpfService.add(addCpfDto);
  }

  @Delete('/cpf/:cpf')
  @ApiOkResponse({ description: 'Remove cpf from blacklist' })
  @ApiBadRequestResponse({ description: 'The cpf is invalid.' })
  @ApiNotFoundResponse({ description: 'The cpf is not blacklisted' })
  remove(@Param() params: RemoveCpfDto) {
    return this.cpfService.remove(params);
  }

  @Get('/cpf/:cpf')
  @ApiOkResponse({})
  @ApiBadRequestResponse({ description: 'The cpf is invalid.' })
  findOne(@Param() params: FindCpfDto) {
    return this.cpfService.findOne(params);
  }

  @Get('/status')
  getStatus() {
    return this.cpfService.status();
  }
}
