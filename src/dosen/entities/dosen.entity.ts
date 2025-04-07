import { Diskusi } from 'src/diskusi/entities/diskusi.entity';
import { Modul } from 'src/modul/entities/modul.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dosen')
export class Dosen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  nidn: string;

  @OneToOne(() => User, (u) => u.dosen)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Diskusi, (diskusi) => diskusi.dosen)
  @JoinColumn({ name: 'id_diskusi' })
  diskusi: Diskusi[];

  @OneToMany(() => Modul, (modul) => modul.dosen)
  modul: Modul[];
}
