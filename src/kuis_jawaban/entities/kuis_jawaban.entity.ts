import { KuisPertanyaan } from 'src/kuis_pertanyaan/entities/kuis_pertanyaan.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('kuis_jawaban')
export class KuisJawaban {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jawaban: string;

  // Relasi ke Pertanyaan
  @ManyToOne(() => KuisPertanyaan, (pertanyaan) => pertanyaan.jawaban)
  @JoinColumn({ name: 'id_kuis_pertanyaan' })
  pertanyaan: KuisPertanyaan;

  // Relasi ke User (atau Mahasiswa)
  @ManyToOne(() => User, (user) => user.kuisJawaban)
  @JoinColumn({ name: 'id_user' }) // bisa diganti ke id_mahasiswa kalau pakai Mahasiswa
  user: User;
}
