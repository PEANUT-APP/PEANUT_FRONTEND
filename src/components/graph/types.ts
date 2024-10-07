export interface GraphType {
  graphData:
    | {
        value: number | null;
        time: number;
        minute: number | null;
      }[];
  size?: 's' | 'm';
}
