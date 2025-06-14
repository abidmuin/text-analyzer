import { Injectable, Logger } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { PrismaService } from '../prisma.service';
import { AnalyzerService } from '../utils/analyzer.service';

@Injectable()
export class TextService {
  private readonly logger = new Logger(TextService.name);

  constructor(private prisma: PrismaService, private analyzerService: AnalyzerService) {
  }

  async create(createTextDto: CreateTextDto) {
    this.logger.log('create');
    this.logger.log(createTextDto);
    const analysis = this.analyzerService.analyzeText(createTextDto.content);
    return this.prisma.text.create({
      data: {
        content: analysis.content,
        charCount: analysis.charCount,
        wordCount: analysis.wordCount,
        sentenceCount: analysis.sentenceCount,
        paragraphCount: analysis.paragraphCount,
        longestWords: analysis.longestWords,
      },
    });
  }

  findAll() {
    return `This action returns all text`;
  }

  findOne(id: number) {
    return `This action returns a #${id} text`;
  }

  update(id: number, updateTextDto: UpdateTextDto) {
    return `This action updates a #${id} text`;
  }

  remove(id: number) {
    return `This action removes a #${id} text`;
  }
}
