import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { CreateHoroscopeDto } from './dto/create-horoscope.dto';

@Injectable()
export class HoroscopeService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY chưa được cấu hình trong backend/.env');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  async createReading(data: CreateHoroscopeDto) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: this.buildPrompt(data),
        config: {
          systemInstruction: [
            'Bạn là trợ lý giải thích tử vi và chiêm tinh bằng tiếng Việt.',
            'Hãy viết dễ hiểu, tích cực và không khẳng định tương lai là chắc chắn.',
            'Không đưa ra chẩn đoán y tế, tư vấn pháp lý hoặc tài chính.',
          ].join(' '),
        },
      });

      const reading = response.text?.trim();

      if (!reading) {
        throw new Error('Gemini không trả về nội dung');
      }

      return {
        success: true,
        reading,
      };
    } catch (error) {
      // Log lỗi chi tiết ở server, nhưng không gửi lỗi nội bộ ra client.
      console.error('Gemini API error:', error);
      throw new InternalServerErrorException(
        'Không thể tạo kết quả tử vi lúc này',
      );
    }
  }

  private buildPrompt(data: CreateHoroscopeDto): string {
    return `
Hãy tạo một bài đọc tử vi tổng quan từ thông tin sau:

- Họ tên: ${data.name}
- Ngày sinh: ${data.birthDate}
- Giờ sinh: ${data.birthTime}
- Nơi sinh: ${data.birthPlace}

Nội dung gồm:
1. Tổng quan tính cách
2. Điểm mạnh
3. Điểm cần cải thiện
4. Công việc
5. Tình cảm
6. Lời khuyên tổng quát

Viết bằng tiếng Việt, trình bày rõ ràng và dài khoảng 500 từ.
    `.trim();
  }
}
