import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfEntity } from './pdf.entity';

@Injectable()
export class PdfService {

  constructor(
    @InjectRepository(PdfEntity)
    private readonly PdfRepository: Repository<PdfEntity>,
  ) { }

  async savepdf(pdfentity: PdfEntity) {
    await this.PdfRepository.save(pdfentity);
  }

}
