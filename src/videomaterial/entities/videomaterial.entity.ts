import { Meeting } from 'src/meeting/entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('video_material')
export class VideoMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  videoUrl: string;

  @ManyToOne(() => Meeting)
  meeting: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_guru' }) // nama kolom di database
  create_by: User; // nama properti di entity

  @CreateDateColumn()
  createdAt: Date;
}
