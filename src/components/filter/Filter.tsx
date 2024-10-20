import React, {useCallback, useState} from 'react';
import {
  FilterDefaultBox,
  FilterOptionBottom,
  FilterOptionBox,
  FilterOptionTop,
  FilterText,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import {View} from 'react-native';
import {FilterType} from './types';

export default function Filter({
  selectedFilter,
  setSelectedFilter,
}: FilterType) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      setSelectedFilter(option);
      setIsOpen(false);
    },
    [setSelectedFilter],
  );

  const getFilterTextColor = useCallback(
    (filter: string) =>
      selectedFilter === filter ? colors.primaryNormal : colors.TextNeutral,
    [selectedFilter],
  );

  return (
    <View>
      <FilterDefaultBox activeOpacity={1} onPress={handleOpen}>
        <FilterText color={colors.TextNeutral}>{selectedFilter}</FilterText>
        <DesignIcon
          type={isOpen ? 'dropOpen' : 'dropClose'}
          size="s"
          color={colors.TextNeutral}
        />
      </FilterDefaultBox>
      {isOpen && (
        <FilterOptionBox>
          <FilterOptionTop
            activeOpacity={1}
            onPress={() => handleSelect('좋아요순')}
            isSelected={selectedFilter === '좋아요순'}>
            <FilterText color={getFilterTextColor('좋아요순')}>
              좋아요순
            </FilterText>
          </FilterOptionTop>
          <FilterOptionBottom
            activeOpacity={1}
            onPress={() => handleSelect('최신순')}
            isSelected={selectedFilter === '최신순'}>
            <FilterText color={getFilterTextColor('최신순')}>최신순</FilterText>
          </FilterOptionBottom>
        </FilterOptionBox>
      )}
    </View>
  );
}
