export interface BloodSugarItemType {
  name: 'high' | 'good' | 'low' | 'danger';
  type?: 'guide' | 'report';
}

export interface AverageItemType {
  name: 'great' | 'normal' | 'bad';
  type?: 'guide' | 'report';
}
