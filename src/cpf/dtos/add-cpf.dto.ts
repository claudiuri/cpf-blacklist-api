import { IsCPF } from 'brazilian-class-validator';

export class AddCpfDto {
  @IsCPF({ message: 'CPF inválido' })
  cpf!: string;
}
