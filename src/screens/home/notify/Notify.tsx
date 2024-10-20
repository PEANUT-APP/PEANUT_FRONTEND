import React from 'react';
import {
  NotifyBox,
  NotifyContainer,
  NotifyContent,
  NotifyTitle,
  SearchBack,
} from './styles';
import DesignIcon from '../../../components/icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {useBackHandler} from '../../../modules/commonHooks';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {NotifyCard} from './NotifyCard';
import {FlatList} from 'react-native';

const notifyData = [
  {
    id: '1',
    date: '5월 24일',
    title: '보호자',
    content:
      '잠깐! 점심에 약 이름을 섭취하셨나요? 얼른 기록해서 보호자 “김유성” 님을 안심시켜주세요.',
  },
  {
    id: '2',
    date: '5월 24일',
    title: '식사',
    content: `아침식사 시간이에요!${'\n'}제 시간에 하는 식사도 혈당 관리에 도움이 돼요.${'\n'}얼른 먹고 오늘도 식사 기록해볼까요?`,
  },
  {
    id: '3',
    date: '5월 24일',
    title: '복약',
    content: `사용자님, 약을 섭취하실 시간이에요.${'\n'}섭취하시면 잊지말고 기록해주세요!`,
  },
  {
    id: '4',
    date: '5월 24일',
    title: '혈당',
    content: `사용자님을 정확하게 진단 해드리고 싶어요.${'\n'}혈당을 재고 기록해주세요.`,
  },
  {
    id: '5',
    date: '5월 24일',
    title: '인슐린',
    content: `사용자님, 인슐린을 주사할 시간이에요.${'\n'}제 시간에 맞고 기록해주세요!`,
  },
];

export default function Notify() {
  const {handleBack} = useBackHandler();

  return (
    <NotifyContainer>
      <SearchBack activeOpacity={1} onPress={handleBack}>
        <DesignIcon type="back" size="l" color={colors.TextNeutral} />
      </SearchBack>
      <NotifyBox>
        <NotifyTitle weight="bold">알림</NotifyTitle>
        <FlatList
          data={notifyData}
          renderItem={({item}) => (
            <NotifyCard
              title={item.title}
              date={item.date}
              content={item.content}
            />
          )}
          ItemSeparatorComponent={NotifyContent}
          keyExtractor={item => item.id}
        />
      </NotifyBox>
      <PrimaryButton size="l">추가하기</PrimaryButton>
    </NotifyContainer>
  );
}
