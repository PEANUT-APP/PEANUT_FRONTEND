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
    date: '2024-05-24',
    content:
      '잠깐! 점심에 약 이름을 섭취하셨나요? 얼른 기록해서 보호자 “김유성” 님을 안심시켜주세요.',
  },
  {
    id: '2',
    date: '2024-05-25',
    content: '오늘 아침 약을 섭취했는지 확인해 주세요.',
  },
  {
    id: '3',
    date: '2024-05-26',
    content: '저녁에 인슐린을 투여하셨나요? 기록을 잊지 마세요.',
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
            <NotifyCard date={item.date} content={item.content} />
          )}
          ItemSeparatorComponent={NotifyContent}
          keyExtractor={item => item.id}
        />
      </NotifyBox>
      <PrimaryButton size="l">추가하기</PrimaryButton>
    </NotifyContainer>
  );
}
