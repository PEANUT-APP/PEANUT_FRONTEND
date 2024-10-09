import {GetPatientInfoReturnType} from '../../../services/user/types';

export interface MyCardType {
  children: string;
  navigate: string;
  title: string;
}

export interface PatientCardType {
  data: GetPatientInfoReturnType;
}
