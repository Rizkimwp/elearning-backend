import { Modul } from 'src/modul/entities/modul.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}

@Entity('media_modul')
export class MediaModul {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  file_path: string;

  @Column({ type: 'enum', enum: MediaType })
  file_type: MediaType;

  @ManyToOne(() => Modul, (m) => m.mediaModul)
  @JoinColumn({ name: 'id_modul' })
  modul: Modul;
}
