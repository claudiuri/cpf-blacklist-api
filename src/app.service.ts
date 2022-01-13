import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { name: 'cpf-blacklist-api', version: '1.0' };
  }
}
