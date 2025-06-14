import { Test, TestingModule } from '@nestjs/testing';
import { TextService } from './text.service';
import { CreateTextDto } from './dto/create-text.dto';
import { PrismaService } from '../prisma.service';
import { AnalyzerService } from '../utils/analyzer.service';

describe('TextService', () => {
  let service: TextService;
  let prisma: PrismaService;

  const mockPrisma = {
    text: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextService, AnalyzerService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<TextService>(TextService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should analyze and create text without userId', async () => {
    const dto: CreateTextDto = {
      content: 'Hello world. This is a test.\nAnother paragraph here.',
    };

    const expectedAnalysis = {
      content: dto.content,
      wordCount: 10,
      charCount: 44,
      sentenceCount: 3,
      paragraphCount: 2,
      longestWords: ['hello', 'paragraph'],
    };

    jest.spyOn(service['analyzerService'], 'analyzeText').mockReturnValue(expectedAnalysis);

    mockPrisma.text.create.mockResolvedValue({
      id: 'mock-id', ...expectedAnalysis, createdAt: new Date(), updatedAt: new Date(), userId: null,
    });

    const result = await service.create(dto);

    expect(service['analyzerService'].analyzeText).toHaveBeenCalledWith(dto.content);
    expect(prisma.text.create).toHaveBeenCalledWith({
      data: {
        content: expectedAnalysis.content,
        charCount: expectedAnalysis.charCount,
        wordCount: expectedAnalysis.wordCount,
        sentenceCount: expectedAnalysis.sentenceCount,
        paragraphCount: expectedAnalysis.paragraphCount,
        longestWords: expectedAnalysis.longestWords,
        userId: undefined,
      },
    });

    expect(result).toHaveProperty('id', 'mock-id');
  });

  it('should handle empty content (edge case)', async () => {
    const dto: CreateTextDto = { content: '' };

    const expectedAnalysis = {
      content: '', wordCount: 0, charCount: 0, sentenceCount: 0, paragraphCount: 0, longestWords: [],
    };

    jest.spyOn(service['analyzerService'], 'analyzeText').mockReturnValue(expectedAnalysis);

    mockPrisma.text.create.mockResolvedValue({
      id: 'mock-id', ...expectedAnalysis, createdAt: new Date(), updatedAt: new Date(), userId: null,
    });

    const result = await service.create(dto);

    expect(result).toHaveProperty('id', 'mock-id');
    expect(result.wordCount).toBe(0);
  });
});
