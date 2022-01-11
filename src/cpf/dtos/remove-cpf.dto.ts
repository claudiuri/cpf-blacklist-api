import { IsCPF } from 'brazilian-class-validator';

export class RemoveCpfDto {
  @IsCPF({ message: 'CPF inválido.' })
  cpf!: string;
}
