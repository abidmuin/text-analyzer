import { Test, TestingModule } from '@nestjs/testing';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { AnalyzerService } from '../utils/analyzer.service';
import { PrismaService } from '../prisma.service';
import { CreateTextDto } from './dto/create-text.dto';

describe('TextController', () => {
  let controller: TextController;
  let textService: TextService;

  const mockTextService = {
    create: jest.fn(),
  };

  const mockPrismaService = {
    text: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [AnalyzerService, { provide: TextService, useValue: mockTextService }, {
        provide: PrismaService,
        useValue: mockPrismaService,
      }],
    }).compile();

    controller = module.get<TextController>(TextController);
    textService = module.get<TextService>(TextService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call textService.create with DTO and return result', async () => {
    const dto: CreateTextDto = { content: 'Hello world.' };
    const expectedResult = { id: 'mock-id', content: dto.content };

    mockTextService.create.mockResolvedValue(expectedResult);

    const result = await controller.create(dto);

    expect(mockTextService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
