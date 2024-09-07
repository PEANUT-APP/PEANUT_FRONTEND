export interface IconType {
  type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'primaryText'
    | 'assistiveText'
    | 'primaryDisabled'
    | 'secondaryDisabled'
    | 'tertiaryDisabled'
    | 'textDisabled'
    | 'outlineDisabled'
    | 'primaryLoading'
    | 'secondaryLoading'
    | 'tertiaryLoading'
    | 'outlineLoading'
    | `${string}Text`;
}

export interface NullType extends IconType {
  size: 'xl' | 'l' | 'm' | 's';
}

export interface LoadingType extends IconType {
  size: 'l' | 'm' | 's';
}

export interface DesignIconType {
  size: 'xl' | 'l' | 'm' | 's';
  type?:
    | 'kakao'
    | 'check'
    | 'back'
    | 'dropClose'
    | 'dropOpen'
    | 'kebab'
    | 'like'
    | 'comment';
  color?: string;
}

export interface FitIconType {
  size: 'xl' | 'l' | 'm' | 's';
}

export interface PlusIconType {
  size: 'l' | 'm' | 's';
  color: string;
}
