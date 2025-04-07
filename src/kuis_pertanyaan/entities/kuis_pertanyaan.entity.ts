import { Kuis } from 'src/kuis/entities/kuis.entity';
import { KuisJawaban } from 'src/kuis_jawaban/entities/kuis_jawaban.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum KuisPertanyaanJawaban {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
}

@Entity('kuis_pertanyaan')
export class KuisPertanyaan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  pertanyaan: string;

  @Column({ type: 'text' })
  pilihan_a: string;

  @Column({ type: 'text' })
  pilihan_b: string;

  @Column({ type: 'text' })
  pilihan_c: string;

  @Column({ type: 'text' })
  pilihan_d: string;

  @Column({ type: 'enum', enum: KuisPertanyaanJawaban })
  jawaban_benar: KuisPertanyaanJawaban;

  @ManyToOne(() => Kuis, (kuis) => kuis.pertanyaan)
  @JoinColumn({ name: 'id_kuis' })
  kuis: Kuis;

  @OneToMany(() => KuisJawaban, (jawaban) => jawaban.pertanyaan)
  jawaban: KuisJawaban[];
}
