import { KuisPertanyaan } from 'src/kuis_pertanyaan/entities/kuis_pertanyaan.entity';
import { Modul } from 'src/modul/entities/modul.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('kuis')
export class Kuis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => Modul, (m) => m.kuis)
  @JoinColumn({ name: 'id_modul' })
  modul: Modul;

  @OneToMany(() => KuisPertanyaan, (pertanyaan) => pertanyaan.kuis)
  pertanyaan: KuisPertanyaan[];
}
