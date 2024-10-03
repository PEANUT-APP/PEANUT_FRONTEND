import {ReactNode} from 'react';

export interface ButtonType {
  size: 'l' | 'm' | 's';
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  type?: string;
  icon?: (props: {size: 'xl' | 'l' | 'm' | 's'}) => JSX.Element;
}

export interface PrimaryButtonType extends ButtonType {
  onPress?: () => void;
}

export interface OutlineButtonType extends ButtonType {
  onPress?: (data: {email: string}) => void;
}

export interface ButtonStyleType extends ButtonType {
  isPressed: boolean;
}

export interface OutlineButtonStyleType extends OutlineButtonType {
  isPressed: boolean;
}

export interface SelectButtonType {
  children: ReactNode;
  isSelected: boolean;
  onPress?: () => void;
}

export interface SelectButtonStyleType extends SelectButtonType {
  isSelected: boolean;
}

export interface NavigationButtonType {
  children: ReactNode;
  type: 'medical' | 'home' | 'community' | 'my';
  active: boolean;
  onPress: () => void;
}

export interface PlusButtonType {
  onPress: () => void;
}

export interface CheckButtonType {
  isChecked: boolean;
  onPress: () => void;
}
