// database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PdfEntity } from 'src/Pdf/pdf.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dream',
    password: 'dream',
    database: 'pdf_editor',
    entities: [PdfEntity],
    synchronize: true,
};
