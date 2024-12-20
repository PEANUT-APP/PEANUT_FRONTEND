export interface CommunityListReturnType {
  commentCount: number;
  content: string;
  gender?: string;
  id: number;
  imageUrl: string;
  like: number;
  name: string;
  title: string;
  userId?: number;
  createTime: string;
}

export interface CommunityCreateFormType {
  title: string;
  content: string;
}

export interface CommentReturnType {
  content: string;
  createTime: string | undefined;
  id: number;
  imageUrl: string;
  userId: number;
  userName: string;
}

export interface CommunityDetailCardReturnType {
  content: string;
  gender?: string;
  id: number;
  imageUrl: string | null;
  like: number;
  nickName: string;
  title: string;
  userId: number;
  liked: boolean;
  create_At: string;
}

export interface CommunityDetailReturnType
  extends CommunityDetailCardReturnType {
  comments: CommentReturnType[];
}

export interface CommunityLikeFormType {
  communityId: number;
  liked: boolean;
}

export interface CommentFormType {
  comment: string;
  id: number;
}
