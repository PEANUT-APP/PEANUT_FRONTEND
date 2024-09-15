export interface GraphType {
  graphData:
    | {
        value: number | null;
        hideDataPoint?: boolean;
        customDataPoint?: () => Element;
      }[]
    | undefined;
}
