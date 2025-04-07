import { Diskusi } from 'src/diskusi/entities/diskusi.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('komentar')
export class Komentar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  komentar: string;

  @Column({ type: 'varchar', length: 255 })
  file_path: string;

  @ManyToOne(() => User, (u) => u.komentar)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Diskusi, (diskusi) => diskusi.komentar)
  @JoinColumn({ name: 'id_diskusi' })
  diskusi: Diskusi;
}
