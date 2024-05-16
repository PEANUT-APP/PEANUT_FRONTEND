import React, {useState} from 'react';
import {MainValue, LargeMainValue} from '../../components/value/MainValue';
import styled from 'styled-components/native';
import SelectButton from '../../components/button/SelectButton';

const Container = styled.View`
  align-items: center;
  gap: 10px;
`;

export default function MainValueTest() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  return (
    <Container>
      <MainValue title="공복 혈당 지수" value={87} />
      <MainValue title="공복 혈당 지수" />
      <MainValue title="공복 혈당 지수" text="식전" value={87} />
      <LargeMainValue title="식단 기록">
        <SelectButton
          isSelected={selectedId === 1}
          onPress={() => handleSelect(1)}>
          아침
        </SelectButton>
        <SelectButton
          isSelected={selectedId === 2}
          onPress={() => handleSelect(2)}>
          점심
        </SelectButton>
        <SelectButton
          isSelected={selectedId === 3}
          onPress={() => handleSelect(3)}>
          저녁
        </SelectButton>
        <SelectButton
          isSelected={selectedId === 4}
          onPress={() => handleSelect(4)}>
          간식
        </SelectButton>
      </LargeMainValue>
      <LargeMainValue title="식단 기록" text="기본 텍스트 메세지 입니다" />
    </Container>
  );
}
