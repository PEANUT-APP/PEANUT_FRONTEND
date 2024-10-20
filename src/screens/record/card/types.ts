export interface RecordCardType {
  name: string;
  description: string;
  time: string[];
  isOngoing: boolean;
  onToggle: () => void;
  type: string;
}

export interface TagType {
  children: string;
  isOngoing?: boolean;
}
