import { Controller, Get, Put, UseInterceptors, Param, Res, Body, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfEntity } from './pdf.entity';
import { Response } from 'express';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import * as path from 'path';
import { PdfService } from 'src/Pdf/pdf.service';

@Controller('api/v1/')
export class PdfController {

  constructor(private readonly pdfService: PdfService) { }

  defaultFileName = "example.pdf";

  @Get('file')
  async getFile(string, @Res() res: Response) {

    try {
      const filePath = path.join(__dirname, '../..', 'pdf_files', this.defaultFileName);
      if (!fs.existsSync(filePath))
        return res.status(404).send('File not found error');


      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${this.defaultFileName}`);
      fs.createReadStream(filePath).pipe(res);

    } catch (error) {
      console.error("something went wrong! 😟");
      throw new InternalServerErrorException('Something went wrong while processing the request');
      return res.status(404).send('something went wrong!');
    }
  }

  @Put('file')
  async saveFile(@Body() requestBody: { pdfData: number[] }) {
    const uint8Array = new Uint8Array(requestBody.pdfData); // Convert array back to Uint8Array
    try {
      const filePath = `pdf_files/example.pdf`;

      await writeFile(filePath, uint8Array); // Save the Uint8Array to the file path

      const pdfData = requestBody.pdfData;

      const location = `/pdf_files/example.pdf`;
      const pdfEntity = new PdfEntity();
      pdfEntity.fileName = 'example.pdf';
      pdfEntity.pdfLocation = location;
      pdfEntity.pdfData = pdfData;
      await this.pdfService.savepdf(pdfEntity);

      return 'PDF saved successfully';
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file');
    }
  }

}
