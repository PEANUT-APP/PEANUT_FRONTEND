import React, {useState} from 'react';
import {TimeInputType} from './types';
import {colors} from '../../styles/colors';
import {View} from 'react-native';
import {InputBox, InputLabel, InputText} from './styles';

export default function TimeInput({
  placeholder,
  value,
  editable = true,
  onChangeText,
}: TimeInputType) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldShowLabel = isFocused || !!value;

  return (
    <View>
      {shouldShowLabel && (
        <InputLabel color={colors.TextNeutral}>{placeholder}</InputLabel>
      )}
      <InputBox isFocused={isFocused} editable={editable}>
        <InputText
          placeholder={isFocused ? '' : placeholder}
          placeholderTextColor={colors.TextNeutral}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
      </InputBox>
    </View>
  );
}
