import React, {useCallback, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Input from './Input';
import {TouchableOpacity} from 'react-native';
import {TimeInputType} from './types';
import {InputBox, InputLabel, InputText} from './styles';
import {colors} from '../../styles/colors';
import {formatTime} from './hooks';

export default function TimeInput({
  name,
  control,
  placeholder,
  errors,
  touchedFields,
  trigger,
  setValue,
  setFocus,
  value,
  editable = false,
  onChangeText,
}: TimeInputType) {
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const currentTime = new Date();
    const localTime = new Date(currentTime.getTime() + 9 * 60 * 60 * 1000);
    setTime(localTime);
    const formattedTime = formatTime(localTime);

    if (setValue && name) {
      setSelectedTime(formattedTime);
      setValue(name, formattedTime);
    }
  }, [name, setValue]);

  const handleOpenDate = () => {
    setDatePickerVisibility(true);
    if (setFocus && name) {
      setFocus(name);
    }
  };

  // 날짜 선택 시 처리
  const handleConfirm = async (selectDate: Date) => {
    const formattedDate = formatTime(selectDate);
    setTime(selectDate);
    setSelectedTime(formattedDate);
    setDatePickerVisibility(false);

    if (setValue && name && trigger) {
      setValue(name, formattedDate);
      await trigger(name);
    }

    if (onChangeText) {
      onChangeText(formattedDate);
    }
  };

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  if (control && name && errors && touchedFields && trigger) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleOpenDate}>
        <Input
          control={control}
          name={name}
          placeholder={placeholder}
          value={selectedTime}
          editable={false}
          errors={errors}
          touchedFields={touchedFields}
          trigger={trigger}
          date={true}
        />
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={time}
          mode="time"
          onConfirm={selectDate => handleConfirm(selectDate)}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleOpenDate}>
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
            editable={false}
            date={true}
          />
        </InputBox>
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={time}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </TouchableOpacity>
    );
  }
}
