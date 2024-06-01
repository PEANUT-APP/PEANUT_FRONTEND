import {ReactNode} from 'react';

export interface SignType {
  title: string;
  children: ReactNode;
  button: ReactNode;
  verification?: boolean;
  setVerification?: React.Dispatch<React.SetStateAction<boolean>>;
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}
