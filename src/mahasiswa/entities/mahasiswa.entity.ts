import { ProgramStudi } from 'src/program_studi/entities/program_studi.entity';
import { Semester } from 'src/semester/entities/semester.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mahasiswa')
export class Mahasiswa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  nim: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (u) => u.mahasiswa)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => ProgramStudi, (ps) => ps.mahasiswa)
  @JoinColumn({ name: 'id_program_studi' })
  programStudi: ProgramStudi;

  @ManyToOne(() => Semester, (s) => s.mahasiswa)
  @JoinColumn({ name: 'id_semester' })
  semester: Semester;
}
