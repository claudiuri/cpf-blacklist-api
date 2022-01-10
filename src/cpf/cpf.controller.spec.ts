import { Test, TestingModule } from '@nestjs/testing';
import { CpfController } from './cpf.controller';

describe('CpfController', () => {
  let controller: CpfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfController],
    }).compile();

    controller = module.get<CpfController>(CpfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
