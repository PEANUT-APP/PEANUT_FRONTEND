import {ReactNode} from 'react';

interface DefaultMainValueType {
  title?: string;
  text?: string;
}

export interface MainValueType extends DefaultMainValueType {
  value?: number;
  onPress?: () => void;
}

export interface LargeMainValueType extends DefaultMainValueType {
  children?: ReactNode;
}

export interface MainValueStyleType {
  isChildren?: boolean;
}
