export interface GetUserInfoReturnType {
  height: string;
  id: number;
  profileUrl: string;
  username: string;
  weight: string;
}
export interface GetPatientInfoReturnType {
  birthday: string;
  gender: string;
  height: string;
  id: number;
  profileUrl: string;
  userName: string;
  weight: string;
}

export interface GetPatientReturnType {
  birthday: string;
  gender: string;
  name: string;
  phoneNumber: string;
  profileImage: string;
}

export interface GetGuardianReturnType {
  birthday: string;
  gender: string;
  height: string;
  id: number;
  profileUrl: string;
  userName: string;
  weight: string;
}

export interface GetPatientFormType {
  email: string;
}

export interface GetConnectingInfoReturnType {
  status: string;
  userId: number;
  userName: string;
}

export interface GuardianRelationFormType {
  guardianCode: string;
}

export interface UpdateFormType {
  formData: FormData;
  nickname: string;
  height: string;
  weight: string;
}

export interface MyCommunityReturnType {
  comment: number;
  content: string;
  create_At: string;
  like: number;
  title: string;
  userId: number;
  userName: string;
  communityId: number;
  imageUrl: string;
}

export interface AlarmReturnType {
  guardianAlam: boolean;
  insulinAlam: boolean;
  medicationAlam: boolean;
  userId: number;
}

export interface AlarmFormType {
  guardianAlam: boolean;
  insulinAlam: boolean;
  medicationAlam: boolean;
}

export interface UpdateUserReturnType {
  birthday: string;
  gender: string;
  phoneNumber: string;
  userName: string;
}

export interface UpdateUserFormType {
  birthday: string;
  gender: string;
  password: string;
  phoneNumber: string;
  userName: string;
}
