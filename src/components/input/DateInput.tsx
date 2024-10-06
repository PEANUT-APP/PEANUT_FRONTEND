import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Input from './Input';
import {TouchableOpacity} from 'react-native';
import {DateInputType} from './types';

export default function DateInput({
  name,
  control,
  placeholder,
  errors,
  touchedFields,
  trigger,
  setValue,
  setFocus,
}: DateInputType) {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );

  // 날짜 포맷 함수
  const formatDate = (selectDate: Date) => {
    const year = selectDate.getFullYear();
    const month = (selectDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectDate.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

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
