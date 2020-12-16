import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsInt } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @IsEmail()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public genre: string;

  @Column()
  public birthDate: Date;

  @Column()
  public role: string;

  @Column()
  public identityType: string;

  @Column()
  public identityNumber: number;

  @Column()
  public phoneNumber1: number;

  @Column()
  public phoneNumber2: number;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
