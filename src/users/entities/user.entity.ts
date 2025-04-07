import { Dosen } from 'src/dosen/entities/dosen.entity';
import { Komentar } from 'src/komentar/entities/komentar.entity';
import { KuisJawaban } from 'src/kuis_jawaban/entities/kuis_jawaban.entity';
import { Mahasiswa } from 'src/mahasiswa/entities/mahasiswa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  MAHASISWA = 'mahasiswa',
  DOSEN = 'dosen',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Dosen, (d) => d.user)
  dosen: Dosen;

  @OneToOne(() => Mahasiswa, (m) => m.user)
  mahasiswa: Mahasiswa;

  @OneToMany(() => Komentar, (komentar) => komentar.user)
  komentar: Komentar[];

  @OneToMany(() => KuisJawaban, (jawaban) => jawaban.user)
  kuisJawaban: KuisJawaban[];
}
