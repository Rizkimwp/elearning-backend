import { Dosen } from 'src/dosen/entities/dosen.entity';
import { Komentar } from 'src/komentar/entities/komentar.entity';
import { Modul } from 'src/modul/entities/modul.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('diskusi')
export class Diskusi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  judul: string;

  @Column({ type: 'text' })
  deskripsi: string;

  @ManyToOne(() => Dosen, (dosen) => dosen.diskusi)
  @JoinColumn({ name: 'id_dosen' })
  dosen: Dosen;

  @ManyToOne(() => Modul, (modul) => modul.diskusi)
  @JoinColumn({ name: 'id_modul' })
  modul: Modul;

  @OneToMany(() => Komentar, (komentar) => komentar.diskusi)
  komentar: Komentar[];
}
