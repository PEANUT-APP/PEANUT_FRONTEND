import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormTrigger,
} from 'react-hook-form';
import {FormData} from '../input/types';

export interface DropdownFieldType {
  children: string;
  onPress: () => void;
  isSelected: boolean;
}

export interface DropdownType {
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
  trigger: UseFormTrigger<FormData>;
}
