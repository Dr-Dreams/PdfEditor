import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PdfEntity } from './pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PdfEntity]),
  ],
  controllers: [PdfController],
  providers: [PdfService]
})
export class PdfModule { }