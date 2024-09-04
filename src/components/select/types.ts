import {ReactNode} from 'react';

export interface MultiSelectType {
  children: ReactNode;
  isSelected: boolean;
  onPress?: () => void;
}

export interface MultiSelectStyleType {
  isSelected: boolean;
}

export interface MultiListType {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  onAddPress: () => void;
}

export interface AddType {
  onPress: () => void;
}

export interface AddStyleType {
  isActive: boolean;
}
