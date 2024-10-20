import {ReactNode} from 'react';

export interface GuardianType {
  title: string;
  subTitle: string;
  children: ReactNode;
  button?: ReactNode;
  isComplete?: boolean;
}

export interface GuardianInfoType {
  userName: string;
  gender: string;
  birth: string;
  height: number;
  weight: number;
  imageUrl?: string | null;
}
