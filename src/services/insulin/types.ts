export interface InsulinFormType {
  alarm: boolean;
  administrationTime: string[];
  dosage: string;
  productName: string;
}

export interface InsulinRecordReturnType {
  id: number;
  administrationTime: string[];
  dosage: string;
  productName: string;
}
