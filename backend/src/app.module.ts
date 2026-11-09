import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HoroscopeModule } from './horoscope/horoscope.module';

@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HoroscopeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }