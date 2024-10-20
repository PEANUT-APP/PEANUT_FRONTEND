export interface GraphType {
  graphData:
    | {
        value: number | null;
        time: number | null;
        minute: number | null;
        key?: string;
      }[];
  size?: 's' | 'm';
}
