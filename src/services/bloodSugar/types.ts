export interface BloodSugarFormType {
  bloodSugarLevel: string;
  measurementCondition: string;
  measurementTime: string;
  memo: string;
}

interface DailyStatus {
  bloodSugarStatus: string;
  date: string;
}

export interface TransformedBloodDailyStatus {
  bloodSugarStatus: 'good' | 'high' | 'low' | 'danger' | string;
  date: string;
}

export interface BloodSugarReportType {
  dailyStatuses: DailyStatus[];
  monthlyAvg: number;
  monthlyAvgStatus: string;
  monthlyStatusMessage: string;
}

export interface TransformedBloodSugarReportType {
  dailyStatuses: TransformedBloodDailyStatus[];
  monthlyAvg: number;
  monthlyAvgStatus: string;
  monthlyStatusMessage: string;
}
