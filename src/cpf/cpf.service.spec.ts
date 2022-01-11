import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { CpfService } from './cpf.service';
import { BlackList } from './entities/black-list.entity';

describe('CpfService', () => {
  let cpfService: CpfService;
  let loggerService: LoggerService;
  let blackListRepository: Repository<BlackList>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CpfService,
        {
          provide: LoggerService,
          useValue: { getRequestCount: jest.fn(), sum: jest.fn() },
        },
        {
          provide: getRepositoryToken(BlackList),
          useValue: {
            findOne: jest.fn(),
            count: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cpfService = module.get<CpfService>(CpfService);
    loggerService = module.get<LoggerService>(LoggerService);
    blackListRepository = module.get(getRepositoryToken(BlackList));
  });

  it('should be defined', () => {
    expect(cpfService).toBeDefined();
  });

  describe('removeMask', () => {
    it('should remove mask from cpf', () => {
      const cpfWithMask = '455.368.970-71';
      const cpfWithoutMask = '45536897071';

      expect(cpfService.removeMask(cpfWithMask)).toBe(cpfWithoutMask);
    });
  });

  describe('findOne', () => {
    it('should return FREE if cpf is not on the blacklist', async () => {
      const cpf = '455.368.970-71';

      jest.spyOn(blackListRepository, 'findOne').mockReturnValue(undefined);

      await expect(cpfService.findOne({ cpf })).resolves.toStrictEqual({
        message: 'FREE',
      });
    });

    it('should return BLOCK if cpf is on the blacklist', async () => {
      const blackList = { id: 1, cpf: '455.368.970-71' };

      jest
        .spyOn(blackListRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(blackList));

      await expect(
        cpfService.findOne({ cpf: blackList.cpf }),
      ).resolves.toStrictEqual({
        message: 'BLOCK',
      });
    });
  });

  describe('add', () => {
    it('should throw bad request error when sending cpf registred', async () => {
      const cpf = '455.368.970-71';
      const blackList = { id: 1, cpf };

      jest
        .spyOn(blackListRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(blackList));

      await expect(cpfService.add({ cpf })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return cpf registred', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(blackListRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(undefined));

      jest
        .spyOn(blackListRepository, 'save')
        .mockImplementationOnce(() => Promise.resolve(blackList));

      await expect(
        cpfService.add({ cpf: blackList.cpf }),
      ).resolves.toStrictEqual(blackList);
    });
  });

  describe('remove', () => {
    it('should throw not found error when sending cpf not registred', async () => {
      const cpf = '45536897071';

      jest
        .spyOn(blackListRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(undefined));

      await expect(cpfService.remove({ cpf })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove cpf from blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(blackListRepository, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(blackList));

      jest
        .spyOn(blackListRepository, 'delete')
        .mockImplementationOnce(() => Promise.resolve({ raw: '' }));

      await expect(
        cpfService.remove({ cpf: blackList.cpf }),
      ).resolves.not.toThrow();
    });
  });

  describe('status', () => {
    it('should return currents status', async () => {
      const count = 5;
      const requestCount = 10;

      jest
        .spyOn(blackListRepository, 'count')
        .mockImplementationOnce(() => Promise.resolve(count));

      jest
        .spyOn(loggerService, 'getRequestCount')
        .mockImplementationOnce(() => requestCount);

      const response = await cpfService.status();

      expect(response).toHaveProperty('uptime');
      expect(response).toHaveProperty('count', count);
      expect(response).toHaveProperty('requestCount', requestCount);
    });
  });
});
