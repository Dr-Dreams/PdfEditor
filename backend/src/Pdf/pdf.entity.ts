import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PdfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column('bytea')
  pdfData: number[];

  @Column()
  pdfLocation: string;
}