import { Mahasiswa } from 'src/mahasiswa/entities/mahasiswa.entity';
import { Modul } from 'src/modul/entities/modul.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('semester')
export class Semester {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  tahun_ajaran: string;

  @Column({ type: 'date' })
  start_at: Date;

  @Column({ type: 'date' })
  end_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Mahasiswa, (m) => m.semester)
  mahasiswa: Mahasiswa[];

  @OneToMany(() => Modul, (modul) => modul.semester)
  modul: Modul[];
}
