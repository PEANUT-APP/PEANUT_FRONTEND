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
import {useMedicine} from './hooks';

const medicationRecords = [
  {
    name: '글루파정',
    date: '월 수 금',
    time: ['아침 후', '오전 11시 30분'],
  },
  {
    name: '로벨정',
    date: '화 목',
    time: ['점심 후', '오후 12시 30분'],
  },
];

export default function MedicineDocument() {
  const {handleBack} = useBackHandler();
  const {medicineState, toggleMedicineState, handleGoAdd} = useMedicine();

  return (
    <DocumentContainer>
      <DocumentBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            복약 기록
          </RecordTitle>
        </RecordTitleBox>
        <FlatList
          data={medicationRecords}
          renderItem={({item}) => (
            <RecordCard
              name={item.name}
              description={item.date}
              time={item.time}
              isOngoing={medicineState[item.name]}
              onToggle={() => toggleMedicineState(item.name)}
              type="medicine"
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
