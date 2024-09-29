export interface CommunityListReturnType {
  content: string;
  gender?: string;
  id: number;
  imageUrl: string;
  like: number;
  name: string;
  title: string;
  userId?: number;
}

export interface CommunityCreateFormType {
  title: string;
  content: string;
}
