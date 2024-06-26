import React from 'react';
import {LargeMainValue} from '../components/value/MainValue';
import SelectButton from '../components/button/SelectButton';

interface SelectButtonGroupType {
  title: string;
  itemList: string[];
  selectedItem: number | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const SelectButtonGroup = ({
  title,
  itemList,
  selectedItem,
  setSelectedItem,
}: SelectButtonGroupType) => {
  const handleItemSelection = (id: number) => {
    setSelectedItem((prevId: number | null) => (prevId === id ? null : id));
  };

  return (
    <LargeMainValue title={title}>
      {itemList.map((item, index) => (
        <SelectButton
          key={index}
          isSelected={selectedItem === index + 1}
          onPress={() => handleItemSelection(index + 1)}>
          {item}
        </SelectButton>
      ))}
    </LargeMainValue>
  );
};

export default SelectButtonGroup;
