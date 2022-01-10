import { Test, TestingModule } from '@nestjs/testing';
import { CpfService } from './cpf.service';

describe('CpfService', () => {
  let service: CpfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpfService],
    }).compile();

    service = module.get<CpfService>(CpfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
