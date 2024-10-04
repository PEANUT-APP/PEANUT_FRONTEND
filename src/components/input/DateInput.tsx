import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from './Input'; // 기존 Input 컴포넌트를 가져옴
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );

  // 날짜 포맷 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleOpenDate = () => {
    setDatePickerVisibility(true);
    setFocus(name);
  };

  // 날짜 선택 시 처리
  const handleConfirm = async (date: Date) => {
    const formattedDate = formatDate(date);
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </TouchableOpacity>
  );
}
