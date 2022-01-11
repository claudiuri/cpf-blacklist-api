import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sum', () => {
    it('should amount request count', () => {
      service.sum();
      service.sum();

      expect(service.getRequestCount()).toBe(2);
    });
  });

  describe('getRequestCount', () => {
    it('should amount request count', () => {
      service.sum();

      expect(service.getRequestCount()).toBe(1);
    });
  });
});
