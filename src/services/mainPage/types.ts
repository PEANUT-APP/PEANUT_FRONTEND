export interface UserInfoReturnType {
  currentBloodSugarLevel: string;
  fastingBloodSugarLevel: string;
  profileUrl: string;
  userId: number;
  userName: string;
}

export interface BloodSugarItem {
  // bloodSugarList 배열 내부에 있는 객체의 구조를 정의해야 합니다.
  // 여기에 혈당 관련 데이터를 추가해야 합니다.
  // 예: 시간, 값 등 추가적인 정보가 있는 경우 그에 맞는 타입을 정의합니다.
  // 빈 객체가 있을 수 있으므로 우선 `any`로 설정
  [key: string]: any;
}

export interface AdditionalInfoReturnType {
  bloodSugarList: BloodSugarItem[];
  insulinState: boolean;
  insulinName: string;
  medicineState: boolean;
  medicineName: string;
}

export interface FoodReturnType {
  carbohydrate: number;
  fat: number;
  protein: number;
}
