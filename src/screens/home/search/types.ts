import {Dispatch, SetStateAction} from 'react';

export interface SearchType {
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
}
