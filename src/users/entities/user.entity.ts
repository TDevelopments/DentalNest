import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum UserIdentity {
  DNI = 'dni',
  PASSPORT = 'passport',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @IsEmail()
  public email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  public password: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @Column({ type: 'date' })
  @ApiProperty({ format: 'date', example: '2000-12-31' })
  public birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserGender,
  })
  @IsEnum(UserGender)
  public genre: UserGender;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @Column({
    type: 'enum',
    enum: UserIdentity,
    default: UserIdentity.DNI,
  })
  @IsEnum(UserIdentity)
  public identityType: UserIdentity;

  @Column({ nullable: true })
  @ApiProperty({ example: 76066772 })
  public identityNumber?: number;

  @Column()
  @ApiProperty({ example: 978621899 })
  public phoneNumber1: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 959369909 })
  public phoneNumber2?: number;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
