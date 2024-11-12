import React from 'react';
import {
  RecordBox,
  RecordContainer,
  RecordFormBox,
  RecordTitle,
  RecordTitleBox,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import {useBloodSugar} from './hooks';
import RenderInput from '../../modules/renderInput';
import PrimaryButton from '../../components/button/PrimaryButton';
import TimeInput from '../../components/input/TimeInput';
import Dropdown from '../../components/dropdown/Dropdown';
import {useBackHandler} from '../../modules/commonHooks';

export default function BloodSugarRecord() {
  const {handleBack} = useBackHandler();
  const {
    control,
    errors,
    touchedFields,
    trigger,
    handleSubmit,
    isButtonDisabled,
    setValue,
    setFocus,
  } = useBloodSugar();

  return (
    <RecordContainer>
      <RecordBox>
        <RecordTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <RecordTitle color={colors.TextNormal} weight="bold">
            혈당 기록중
          </RecordTitle>
        </RecordTitleBox>
        <RecordFormBox>
          {RenderInput({
            name: 'bloodSugar',
            placeholder: '혈당 수치',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          <TimeInput
            control={control}
            errors={errors}
            touchedFields={touchedFields}
            trigger={trigger}
            setValue={setValue}
            setFocus={setFocus}
            name="bloodSugarTime"
            placeholder="시간"
          />
          <Dropdown
            control={control}
            errors={errors}
            touchedFields={touchedFields}
            trigger={trigger}
            setValue={setValue}
            setFocus={setFocus}
            name="measurementCondition"
            placeholder="상태"
            size="m"
            options={['공복 혈당', '식전 혈당', '식후 혈당', '자기 전 혈당']}
          />
          {RenderInput({
            name: 'memo',
            placeholder: '메모',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
        </RecordFormBox>
      </RecordBox>
      <PrimaryButton
        size="l"
        onPress={handleSubmit}
        disabled={isButtonDisabled}>
        등록하기
      </PrimaryButton>
    </RecordContainer>
  );
}
