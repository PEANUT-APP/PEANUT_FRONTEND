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

export default function MedicineDocument() {
  const {handleBack} = useBackHandler();
  const {medicineState, toggleMedicineState, handleGoAdd, transformedData} =
    useMedicine();

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
          data={transformedData}
          renderItem={({item}) => (
            <RecordCard
              name={item.medicineName}
              description={item.intakeTime}
              time={item.intakeDays}
              isOngoing={medicineState[item.medicineName]}
              onToggle={() => toggleMedicineState(item.medicineName)}
              type="medicine"
            />
          )}
          keyExtractor={item => item.medicineName}
          ItemSeparatorComponent={DocumentContent}
        />
      </DocumentBox>
      <PrimaryButton size="l" onPress={handleGoAdd}>
        추가하기
      </PrimaryButton>
    </DocumentContainer>
  );
}
