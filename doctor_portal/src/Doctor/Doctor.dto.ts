import { IsString, Matches, IsEmail, IsEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entitiy';
import { AdminEntity } from 'src/Admin/admin.entity';
import { SalaryEntity } from 'src/Admin/salary.entity';
import { DoctorModule } from './doctor.module';
import { NotificationEntity } from './Notification.entity';
import { ArticleEntity } from './article.entity';
import { ReferEntity } from './refer.entity';

export class AddDocotorDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;
  @Matches(/^\d{8,}$/, { message: 'Password must be at least 8 digits long.' })
  password: string;

  id: number;
}

export class DoctorInfo {
  name: string;
  email: string;
}





@Entity("Doctor")
export class DoctorEntity {
  @Column()

  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
  appointment: AppointmentEntity[];

  @ManyToOne(() => AdminEntity, admin => admin.doctor)
  admin: AdminEntity;

  @OneToMany(() => SalaryEntity, salary => salary.doctor)
salary: SalaryEntity[];
@OneToMany(() => NotificationEntity, notification => notification.doctor)
notification: DoctorEntity[];
@OneToMany(() => ArticleEntity, article => article.doctor)
article: DoctorEntity[];
@OneToOne(() => ReferEntity, refer => refer.doctor)
refer: DoctorEntity[];
}
export class LoginDTO {
  @IsEmail({}, { message: "invalid email" })
 email: string;
 password: string;
}

