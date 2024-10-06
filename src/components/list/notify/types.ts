export interface NotifyListItemType {
  children: string;
  isToggleOn: boolean;
  setIsToggleOn: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleChange?: (newToggleState: boolean) => Promise<void>;
}
