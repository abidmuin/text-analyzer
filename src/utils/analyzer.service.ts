import { Injectable } from '@nestjs/common';

export interface TextAnalysisResult {
  content: string;
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWords: string[];
}

@Injectable()
export class AnalyzerService {
  analyzeText(raw: string): TextAnalysisResult {
    const normalized = raw.toLowerCase().replace(/[^\w\s]/g, '');

    const paragraphs = normalized.split(/\n+/).filter(p => p.trim().length > 0);
    const sentences = raw.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = normalized.trim().split(/\s+/);
    const characters = normalized.replace(/\s/g, '');

    const longestWords = paragraphs.map(p => {
      const wordsInParagraph = p.trim().split(/\s+/);
      return wordsInParagraph.reduce((a, b) => b.length > a.length ? b : a, '');
    });

    return {
      content: raw.trim(),
      wordCount: words.length,
      charCount: characters.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      longestWords,
    };
  }
}
