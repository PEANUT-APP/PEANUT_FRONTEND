import {ReactNode} from 'react';

export interface PatientType {
  title: string;
  subTitle: string;
  children: ReactNode;
  button: ReactNode;
  isComplete?: boolean;
}
