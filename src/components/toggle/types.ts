export interface ToggleType {
  isToggleOn: boolean;
  setIsToggleOn: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleChange?: (newState: boolean) => void;
}
