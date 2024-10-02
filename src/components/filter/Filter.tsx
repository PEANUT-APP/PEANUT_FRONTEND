import React, {useState} from 'react';
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

  const handleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setIsOpen(false);
  };

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
            <FilterText
              color={
                selectedFilter === '좋아요순'
                  ? colors.primaryNormal
                  : colors.TextNeutral
              }>
              좋아요순
            </FilterText>
          </FilterOptionTop>
          <FilterOptionBottom
            activeOpacity={1}
            onPress={() => handleSelect('최신순')}
            isSelected={selectedFilter === '최신순'}>
            <FilterText
              color={
                selectedFilter === '최신순'
                  ? colors.primaryNormal
                  : colors.TextNeutral
              }>
              최신순
            </FilterText>
          </FilterOptionBottom>
        </FilterOptionBox>
      )}
    </View>
  );
}
