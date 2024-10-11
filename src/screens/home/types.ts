export interface HomeType {
  username: string;
}

export interface FilteredData {
  [key: number]: {value: number; time: string};
}

export interface GraphType {
  time: number;
  minute: number | null;
  value: number | null;
  key: string;
}
