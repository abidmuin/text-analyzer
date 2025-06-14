// src/text/__tests__/text.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TextService } from '../text.service';
import { PrismaService } from '../../prisma.service';

describe('TextService', () => {
  let service: TextService;

  const prismaMock = {
    text: {
      create: jest.fn().mockResolvedValue({ id: '1', content: 'Hello' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TextService>(TextService);
  });

  it('should create a text', async () => {
    const result = await service.create({ content: 'Hello' });
    expect(result).toEqual({ id: '1', content: 'Hello' });
  });
});
