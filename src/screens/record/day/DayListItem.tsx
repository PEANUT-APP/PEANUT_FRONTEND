import React, {useEffect, useState} from 'react';
import {
  CheckBoxWrapper,
  ListItemContainer,
  ListItemContent,
  ListItemLabel,
  ListItemTop,
} from './styles';
import CheckBox from '../../../components/checkBox/CheckBox';
import DayPicker from './DayPicker';
import {DayListItemType} from './types';

const days = ['월', '화', '수', '목', '금', '토', '일'];

export default function DayListItem({
  intakeDays,
  setIntakeDays,
}: DayListItemType) {
  const [isEverydayChecked, setIsEverydayChecked] = useState(false);

  useEffect(() => {
    if (intakeDays.length === days.length) {
      setIsEverydayChecked(true); // 모든 요일이 선택되면 "모두 선택" 체크박스 활성화
    } else {
      setIsEverydayChecked(false); // 그렇지 않으면 체크박스 비활성화
    }
  }, [intakeDays]);

  const toggleDay = (day: string) => {
    if (intakeDays.includes(day)) {
      setIntakeDays(intakeDays.filter(d => d !== day));
    } else {
      setIntakeDays([...intakeDays, day]);
    }
  };

  const handleCheckAllDays = () => {
    if (isEverydayChecked) {
      setIntakeDays([]);
    } else {
      setIntakeDays(days);
    }
    setIsEverydayChecked(!isEverydayChecked);
  };

  return (
    <ListItemContainer>
      <ListItemTop>
        <ListItemLabel>복약 요일</ListItemLabel>
        <CheckBoxWrapper>
          <CheckBox
            isChecked={isEverydayChecked}
            onPress={handleCheckAllDays}
          />
          <ListItemLabel>매일 반복</ListItemLabel>
        </CheckBoxWrapper>
      </ListItemTop>
      <ListItemContent>
        {days.map(day => (
          <DayPicker
            key={day}
            status={intakeDays.includes(day)}
            onPress={() => toggleDay(day)}>
            {day}
          </DayPicker>
        ))}
      </ListItemContent>
    </ListItemContainer>
  );
}
