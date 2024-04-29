export interface IconType {
  type:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'primaryDisabled'
    | 'secondaryDisabled'
    | 'tertiaryDisabled'
    | 'outlineDisabled'
    | 'primaryLoading'
    | 'secondaryLoading'
    | 'tertiaryLoading'
    | 'outlineLoading';
}

export interface NullType extends IconType {
  size: 'xl' | 'l' | 'm' | 's';
}

export interface LoadingType extends IconType {
  size: 'l' | 'm' | 's';
}
