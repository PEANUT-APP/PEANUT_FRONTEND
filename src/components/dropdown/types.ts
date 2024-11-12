import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import {FormData} from '../input/types';

export interface DropdownFieldType {
  children: string;
  onPress: () => void;
  isSelected: boolean;
  size: 'm' | 's';
}

export interface DropdownType {
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
  trigger: UseFormTrigger<FormData>;
  setValue: UseFormSetValue<FormData>;
  setFocus: UseFormSetFocus<FormData>;
  name: keyof FormData;
  placeholder?: string;
  size: 'm' | 's';
  options: string[];
  isSearch?: boolean;
  value?: string;
}
