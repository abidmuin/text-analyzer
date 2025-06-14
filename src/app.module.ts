import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextModule } from './text/text.module';
import { PrismaService } from './prisma.service';
import { AnalyzerService } from './utils/analyzer.service';

@Module({
  imports: [TextModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AnalyzerService],
})
export class AppModule {}
