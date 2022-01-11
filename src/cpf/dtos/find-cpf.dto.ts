import { IsCPF } from 'brazilian-class-validator';

export class FindCpfDto {
  @IsCPF({ message: 'CPF inválido' })
  cpf!: string;
}
