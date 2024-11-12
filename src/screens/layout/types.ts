import {ReactNode} from 'react';

export interface LayoutType {
  children: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  type?: string;
}

export interface ScrollLayoutType {
  children: ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
  paddingBottom?: number;
}
