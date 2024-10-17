export interface BloodSugarItemType {
  name: 'high' | 'good' | 'low' | 'danger' | string | undefined;
  type?: 'guide' | 'report';
}

export interface AverageItemType {
  name: 'great' | 'normal' | 'bad' | string | undefined;
  type?: 'guide' | 'report';
}
