export interface GraphType {
  graphData:
    | {
        value: number | null;
        time: number;
        minute: number;
      }[];
  size?: 's' | 'm';
}
