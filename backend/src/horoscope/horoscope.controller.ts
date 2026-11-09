import { Body, Controller, Post } from '@nestjs/common';
import { CreateHoroscopeDto } from './dto/create-horoscope.dto';
import { HoroscopeService } from './horoscope.service';

@Controller('horoscope')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) {}

  @Post()
  createReading(@Body() data: CreateHoroscopeDto) {
    return this.horoscopeService.createReading(data);
  }
}
