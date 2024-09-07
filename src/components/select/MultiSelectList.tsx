import React, {useCallback} from 'react';
import {MultiListBox, MultiListContainer, MultiListLabel} from './styles';
import MultiSelectChip from './MultiSelectChip';
import AddChips from './AddChip';
import {MultiListType} from './types';

const items = [
  '아침 후',
  '점심 전',
  '점심 후',
  '저녁 전',
  '저녁 후',
  '자기 전',
];

export default function MultiSelectList({
  selectedItems,
  setSelectedItems,
  onAddPress,
}: MultiListType) {
  const toggleSelection = useCallback(
    (item: string) => {
      setSelectedItems(prevSelectedItems => {
        if (prevSelectedItems.includes(item)) {
          return prevSelectedItems.filter(selected => selected !== item);
        }
        return [...prevSelectedItems, item];
      });
    },
    [setSelectedItems],
  );

  return (
    <MultiListContainer>
      <MultiListLabel>복약 시간</MultiListLabel>
      <MultiListBox>
        {items.map(item => (
          <MultiSelectChip
            key={item}
            isSelected={selectedItems.includes(item)}
            onPress={() => toggleSelection(item)}>
            {item}
          </MultiSelectChip>
        ))}
        <AddChips onPress={onAddPress} />
      </MultiListBox>
    </MultiListContainer>
  );
}
