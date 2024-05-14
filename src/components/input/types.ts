import {Control, DeepMap, FieldError, FieldValues} from 'react-hook-form';

export interface FormData {
  Label: string;
  Label2: string;
  Label3: string;
  Label4: string;
  Label5: string;
  Label6: string;
}

export interface InputType {
  placeholder: string;
  name: keyof FormData;
  rules?: object;
  control: Control<FormData>;
  errors: DeepMap<FieldValues, FieldError>;
  buttonText: string;
  editable?: boolean;
  defaultValue?: string;
  icon?: boolean;
  button?: boolean;
  message?: string;
  touchedFields: DeepMap<Record<string, boolean>, boolean>;
}

export interface InputStyleType {
  isFocused?: boolean;
  editable?: boolean;
  icon?: boolean;
  button?: boolean;
  isError?: boolean;
  isValid?: boolean;
}
