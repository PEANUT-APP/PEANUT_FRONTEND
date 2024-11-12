import {InsulinRecordReturnType} from '../../services/insulin/types';

export interface InsulinRecordWithOngoing extends InsulinRecordReturnType {
  isOngoing: boolean;
}

export interface MedicineRecordWithOngoing {
  isOngoing: boolean;
  intakeTime: string;
  id: number;
  intakeDays: string[];
  medicineName: string;
  activeStatus: string;
}
