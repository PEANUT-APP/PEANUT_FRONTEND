import {ReactNode} from 'react';

export interface ButtonType {
  size: 'l' | 'm' | 's';
  disabled?: boolean;
  style?: 'left' | 'right' | 'both';
  children: ReactNode;
  isLoading?: boolean;
  type?: string;
}

export interface ButtonStyleType extends ButtonType {
  isPressed: boolean;
}
