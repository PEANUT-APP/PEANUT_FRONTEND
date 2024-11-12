import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Input from './Input';
import {TouchableOpacity} from 'react-native';
import {DateInputType} from './types';
import {formatDate} from './hooks';

export default function DateInput({
  name,
  control,
  placeholder,
  errors,
  touchedFields,
  trigger,
  setValue,
  setFocus,
  value,
}: DateInputType) {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (value) {
      const formattedValue = value.replace(/\./g, '-');
      const parsedDate = new Date(formattedValue);
      setDate(parsedDate);
      setValue(name, value || '');
      setSelectedDate(value);
    }
  }, [name, setValue, value]);

  const handleOpenDate = () => {
    setDatePickerVisibility(true);
    setFocus(name);
  };

  // 날짜 선택 시 처리
  const handleConfirm = async (selectDate: Date) => {
    const formattedDate = formatDate(selectDate);
    setDate(selectDate);
    setSelectedDate(formattedDate);
    setValue(name, formattedDate);
    setDatePickerVisibility(false);

    await trigger(name);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleOpenDate}>
      <Input
        control={control}
        name={name}
        placeholder={placeholder}
        value={selectedDate}
        editable={false}
        errors={errors}
        touchedFields={touchedFields}
        trigger={trigger}
        date={true}
      />
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={date}
        mode="date"
        onConfirm={selectDate => handleConfirm(selectDate)}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </TouchableOpacity>
  );
}
