export interface CommentInfoType {
  commentLength: number;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface CommentInputType {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  handleComment: () => void;
}
