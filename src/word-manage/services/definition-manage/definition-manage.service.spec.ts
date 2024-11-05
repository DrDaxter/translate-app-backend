import { Test, TestingModule } from '@nestjs/testing';
import { DefinitionManageService } from './definition-manage.service';

describe('DefinitionManageService', () => {
  let service: DefinitionManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefinitionManageService],
    }).compile();

    service = module.get<DefinitionManageService>(DefinitionManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
