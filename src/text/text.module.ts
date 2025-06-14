import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { PrismaService } from '../prisma.service';
import { AnalyzerService } from '../utils/analyzer.service';

@Module({
  controllers: [TextController], providers: [TextService, PrismaService, AnalyzerService],
})
export class TextModule {
}
