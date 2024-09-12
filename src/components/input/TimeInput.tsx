import React, {useCallback, useState} from 'react';
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

  const handleFocus = useCallback(() => {
    if (!isFocused) {
      setIsFocused(true);
    }
  }, [isFocused]);

  const handleBlur = useCallback(() => {
    if (isFocused) {
      setIsFocused(false);
    }
  }, [isFocused]);

  return (
    <View>
      {(isFocused || value) && (
        <InputLabel color={colors.TextNeutral}>{placeholder}</InputLabel>
      )}
      <InputBox isFocused={isFocused} editable={editable}>
        <InputText
          placeholder={isFocused ? '' : placeholder}
          placeholderTextColor={colors.TextNeutral}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
      </InputBox>
    </View>
  );
}
