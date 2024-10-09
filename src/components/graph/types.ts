export interface GraphType {
  graphData:
    | {
        value: number | null;
        time: number;
        minute: number | null;
        key: string;
      }[];
  size?: 's' | 'm';
}
