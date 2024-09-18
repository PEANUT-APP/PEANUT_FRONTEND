import React, {useState} from 'react';
import {HomeSearchBox, HomeSearchInput} from './styles';
import {colors} from '../../styles/colors';
import {SearchType} from './types';
import SearchIcon from '../../assets/images/Search.svg';

export default function Search({
  onChangeText,
  onSubmitEditing,
  disabled,
  placeholder,
}: SearchType) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <HomeSearchBox isFocused={isFocused}>
      <HomeSearchInput
        placeholder={placeholder}
        placeholderTextColor={colors.TextDisabled}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
      />
      <SearchIcon onPress={onSubmitEditing} />
    </HomeSearchBox>
  );
}
