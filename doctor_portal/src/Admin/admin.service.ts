import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAdminDTO } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { DoctorEntity } from '../Doctor/doctor.dto';
import { PatientEntity } from 'src/Patient/Patient.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>
  ) {}

  async addAdmin(data: AddAdminDTO): Promise<AdminEntity> {
    console.log("Account Created Successfully");
    return this.AdminRepo.save(data);
  }

  async ViewProfile(id: number): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      select: {
        name: true,
        email: true,
        id: true,
        password: true
      },
      where: {
        id: id,
      }
    });
  }
//Doctor section
  async addDoctor(doctor: any): Promise<DoctorEntity> {
    return this.doctorRepo.save(doctor);
  }

  async getAllDoctor(): Promise<DoctorEntity[]> {
    return this.doctorRepo.find();
}

async getDoctorById(id: number): Promise<DoctorEntity> {
  return this.doctorRepo.findOne({ where: { id } });
}

  viewDoctorsByAdmin(id: any): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      where: { id: id },
      relations: {
        doctor: true,
      },
    });
  }

  async deleteAllDoctors(): Promise<{ message: string }> {
    const deleteResult = await this.doctorRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All doctors removed successfully' };
    } else {
      return { message: 'No doctors to remove' };
    }
  }
  
  
  async deleteOneDoctor(Id: number): Promise<{ message: string }> {
    const doctor = await this.doctorRepo.findOne({
      where: { id: Id },
    });
    
    if (!doctor) {
      throw new NotFoundException('doctor not found');
    }
  
    await this.doctorRepo.remove(doctor);
    return { message: 'Doctor removed successfully' };
  }

  //Patient Section
  async addPatient(patient: any): Promise<PatientEntity> {
    return this.patientRepo.save(patient);
  }

  async getAllPatient(): Promise<PatientEntity[]> {
    return this.patientRepo.find();
}

async getPatientById(id: number): Promise<PatientEntity> {
  return this.patientRepo.findOne({ where: { id } });
}




  
  viewPatientsByAdmin(id: any): Promise<AdminEntity[]> {
    return this.AdminRepo.find({
      where: { id: id },
      relations: {
        patient: true,
      },
    });
  }

  async deleteAllPatients(): Promise<{ message: string }> {
    const deleteResult = await this.patientRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All patients deleted successfully' };
    } else {
      return { message: 'No patients found' };
    }
  }
  
  
  async deleteOnePatient(Id: number): Promise<{ message: string }> {
    const patient = await this.patientRepo.findOne({
      where: { id: Id },
    });
    
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    await this.patientRepo.remove(patient);
    return { message: 'Patient deleted successfully' };
  }

  
}