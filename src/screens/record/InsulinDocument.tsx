import React from 'react';
import {
  DocumentContainer,
  DocumentContent,
  DocumentBox,
  RecordTitle,
  RecordTitleBox,
} from './styles';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FlatList, TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBackHandler} from '../../modules/commonHooks';
import RecordCard from './card/RecordCard';
import {useInsulin} from './hooks';

const insulinRecords = [
  {
    name: '휴물린R주',
    amount: '100',
    time: ['아침 후', '오전 11시 30분'],
  },
  {
    name: '휴물린',
    amount: '100',
    time: ['점심 후', '오후 12시 30분'],
  },
];

export default function InsulinDocument() {
  const {handleBack} = useBackHandler();
  const {insulinState, toggleInsulinState, handleGoAdd} = useInsulin();

  return (
    <DocumentContainer>
      <DocumentBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            인슐린 기록
          </RecordTitle>
        </RecordTitleBox>
        <FlatList
          data={insulinRecords}
          renderItem={({item}) => (
            <RecordCard
              name={item.name}
              description={item.amount}
              time={item.time}
              isOngoing={insulinState[item.name]}
              onToggle={() => toggleInsulinState(item.name)}
              type="insulin"
            />
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={DocumentContent}
        />
      </DocumentBox>
      <PrimaryButton size="l" onPress={handleGoAdd}>
        추가하기
      </PrimaryButton>
    </DocumentContainer>
  );
}
