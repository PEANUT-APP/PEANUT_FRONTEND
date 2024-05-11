import {ReactNode} from 'react';

export interface ButtonType {
  size: 'l' | 'm' | 's';
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  type?: string;
}

export interface ButtonStyleType extends ButtonType {
  isPressed: boolean;
}
