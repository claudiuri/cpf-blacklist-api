import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private requestCount = 0;

  getRequestCount() {
    return this.requestCount;
  }

  sum() {
    this.requestCount += 1;
  }
}
