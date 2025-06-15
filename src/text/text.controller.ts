import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TextService } from './text.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('texts')
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  @ApiOperation({ summary: 'Analyze and store text' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new text entry.',
    content: {
      'application/json': {
        example: {
          id: 'ea1df81d-8732-44bd-ac64-7a018c63b734',
          content:
            'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
          charCount: 58,
          wordCount: 16,
          sentenceCount: 2,
          paragraphCount: 1,
          longestWords: ['quick', 'brown', 'jumps', 'slept'],
          createdAt: '2025-06-15T03:40:47.453Z',
          updatedAt: '2025-06-15T03:40:47.453Z',
          userId: null,
        },
      },
    },
  })
  create(@Body() createTextDto: CreateTextDto) {
    return this.textService.create(createTextDto);
  }

  @Get() findAll() {
    return this.textService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.textService.findOne(+id);
  }

  @Patch(':id') update(
    @Param('id') id: string,
    @Body() updateTextDto: UpdateTextDto,
  ) {
    return this.textService.update(+id, updateTextDto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.textService.remove(+id);
  }
}
