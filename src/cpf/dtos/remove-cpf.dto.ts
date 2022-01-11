import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';

export class RemoveCpfDto {
  @ApiProperty()
  @IsCPF({ message: 'CPF inválido.' })
  cpf!: string;
}
