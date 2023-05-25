import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Filme {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  mainCharacter: string;

}