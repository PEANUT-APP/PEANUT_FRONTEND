export interface DayPickerType {
  children: string;
  status: boolean;
  onPress: () => void;
}

export interface DayListItemType {
  intakeDays: string[];
  setIntakeDays: React.Dispatch<React.SetStateAction<string[]>>;
}
