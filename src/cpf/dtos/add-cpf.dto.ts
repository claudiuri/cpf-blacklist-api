import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';

export class AddCpfDto {
  @ApiProperty()
  @IsCPF({ message: 'CPF inválido.' })
  cpf!: string;
}
