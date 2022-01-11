import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
    loggerMiddleware = new LoggerMiddleware(loggerService);
  });

  it('should update request count', () => {
    loggerMiddleware.use({ body: {} } as Request, {} as Response, jest.fn());
    loggerMiddleware.use({ body: {} } as Request, {} as Response, jest.fn());

    expect(loggerService.getRequestCount()).toBe(2);
  });
});
