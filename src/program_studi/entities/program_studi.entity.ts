import { Mahasiswa } from 'src/mahasiswa/entities/mahasiswa.entity';
import { Modul } from 'src/modul/entities/modul.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('program_studi')
export class ProgramStudi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Mahasiswa, (m) => m.programStudi)
  mahasiswa: Mahasiswa[];

  @OneToMany(() => Modul, (modul) => modul.programStudi)
  modul: Modul[];
}
