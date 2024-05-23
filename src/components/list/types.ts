import {ImageSourcePropType} from 'react-native';

export interface CommentWithLikeType {
  likes: number;
  comments: number;
}

export interface CommunityListType extends CommentWithLikeType {
  profileSource?: ImageSourcePropType;
  nickname: string;
  text: string;
}

export interface MyListType {
  text: string;
}

export interface FoodImageListType {
  type: string;
  value: string;
}
