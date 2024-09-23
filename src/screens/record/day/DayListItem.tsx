import React, {useCallback} from 'react';
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
  const isEverydayChecked = intakeDays.length === days.length;

  const toggleDay = useCallback(
    (day: string) => {
      if (intakeDays.includes(day)) {
        setIntakeDays(intakeDays.filter(d => d !== day));
      } else {
        setIntakeDays([...intakeDays, day]);
      }
    },
    [intakeDays, setIntakeDays],
  );

  const handleCheckAllDays = useCallback(() => {
    if (isEverydayChecked) {
      setIntakeDays([]);
    } else {
      setIntakeDays(days);
    }
  }, [isEverydayChecked, setIntakeDays]);

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
