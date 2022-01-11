import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CpfController } from './cpf.controller';
import { CpfService } from './cpf.service';

describe('CpfController', () => {
  let controller: CpfController;
  let cpfService: CpfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfController],
      providers: [
        {
          provide: CpfService,
          useValue: {
            add: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            status: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CpfController>(CpfController);
    cpfService = module.get<CpfService>(CpfService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('add', () => {
    it('should add an cpf on the blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(cpfService, 'add')
        .mockImplementationOnce(() => Promise.resolve(blackList));

      await expect(
        controller.add({ cpf: '45536897071' }),
      ).resolves.toStrictEqual(blackList);
    });
  });

  describe('remove', () => {
    it('should add an cpf on the blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(cpfService, 'remove')
        .mockImplementationOnce(() =>
          Promise.reject(new NotFoundException('CPF não encontrado.')),
        );

      await expect(controller.remove({ cpf: blackList.cpf })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should add an cpf on the blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(cpfService, 'remove')
        .mockImplementationOnce(() => Promise.resolve());

      await expect(
        controller.remove({ cpf: blackList.cpf }),
      ).resolves.not.toThrow();
    });
  });

  describe('findOne', () => {
    it('should add an cpf on the blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(cpfService, 'findOne')
        .mockImplementationOnce(() => Promise.resolve({ message: 'FREE' }));

      await expect(
        controller.findOne({ cpf: blackList.cpf }),
      ).resolves.toStrictEqual({
        message: 'FREE',
      });
    });

    it('should add an cpf on the blacklist', async () => {
      const blackList = { id: 1, cpf: '45536897071' };

      jest
        .spyOn(cpfService, 'findOne')
        .mockImplementationOnce(() => Promise.resolve({ message: 'BLOCK' }));

      await expect(
        controller.findOne({ cpf: blackList.cpf }),
      ).resolves.toStrictEqual({
        message: 'BLOCK',
      });
    });
  });

  describe('status', () => {
    it('should add an cpf on the blacklist', async () => {
      const response = { uptime: new Date(), count: 10, requestCount: 20 };

      jest
        .spyOn(cpfService, 'status')
        .mockImplementationOnce(() => Promise.resolve(response));

      await expect(controller.getStatus()).resolves.toStrictEqual(response);
    });
  });
});
