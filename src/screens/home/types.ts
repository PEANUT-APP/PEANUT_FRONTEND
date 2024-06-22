export interface HomeType {
  username: string;
}

export interface SelectButtonGroupType {
  title: string;
  itemList: string[];
  selectedItem: number | null;
  handleItem: (id: number) => void;
}
