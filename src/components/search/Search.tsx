import React, {useState} from 'react';
import {HomeSearchBox, HomeSearchInput} from './styles';
import {colors} from '../../styles/colors';
import {SearchType} from './types';
import SearchIcon from '../../assets/images/Search.svg';

export default function Search({onChangeText, onSubmitEditing}: SearchType) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <HomeSearchBox isFocused={isFocused}>
      <HomeSearchInput
        placeholder="정보가 궁금한 음식명을 입력해보세요"
        placeholderTextColor={colors.TextDisabled}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SearchIcon onPress={onSubmitEditing} />
    </HomeSearchBox>
  );
}
