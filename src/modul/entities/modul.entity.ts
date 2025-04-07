import { Diskusi } from 'src/diskusi/entities/diskusi.entity';
import { Dosen } from 'src/dosen/entities/dosen.entity';
import { Kuis } from 'src/kuis/entities/kuis.entity';
import { MediaModul } from 'src/media_modul/entities/media_modul.entity';
import { ProgramStudi } from 'src/program_studi/entities/program_studi.entity';
import { Semester } from 'src/semester/entities/semester.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('modul')
export class Modul {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  judul: string;

  @Column({ type: 'text' })
  deskripsi: string;

  @ManyToOne(() => ProgramStudi, (ps) => ps.modul)
  @JoinColumn({ name: 'id_program_studi' })
  programStudi: ProgramStudi;

  // Relasi ke Dosen
  @ManyToOne(() => Dosen, (dosen) => dosen.modul)
  @JoinColumn({ name: 'id_dosen' })
  dosen: Dosen;

  // Relasi ke Semester
  @ManyToOne(() => Semester, (semester) => semester.modul)
  @JoinColumn({ name: 'id_semester' })
  semester: Semester;

  @OneToMany(() => Diskusi, (diskusi) => diskusi.modul)
  diskusi: Diskusi[];

  @OneToMany(() => MediaModul, (M) => M.modul)
  mediaModul: MediaModul[];

  @OneToMany(() => Kuis, (k) => k.modul)
  kuis: Kuis[];
}
