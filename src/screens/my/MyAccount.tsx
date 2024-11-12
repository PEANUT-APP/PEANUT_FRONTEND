import React from 'react';
import {
  MyAccountButton,
  MyEditForm,
  MyEditInputBox,
  MyMoreContainer,
  MyMoreTitle,
  MyMoreTop,
} from './styles';
import {TouchableOpacity} from 'react-native';
import {useBackHandler} from '../../modules/commonHooks';
import {colors} from '../../styles/colors';
import DesignIcon from '../../components/icon/DesignIcon';
import RenderInput from '../../modules/renderInput';
import {useMyAccount} from './hooks';
import PrimaryButton from '../../components/button/PrimaryButton';
import {PrimaryTextButton} from '../../components/button/TextButton';
import Dropdown from '../../components/dropdown/Dropdown';
import DateInput from '../../components/input/DateInput';
import {handleFormError} from '../../modules/formHandler';

export default function MyAccount() {
  const {handleBack} = useBackHandler();
  const {
    control,
    trigger,
    errors,
    touchedFields,
    setFocus,
    setValue,
    isButtonDisabled,
    handleSubmit,
    handleUpdate,
    birth,
    gender,
  } = useMyAccount();

  return (
    <MyMoreContainer color="#fff">
      <MyMoreTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <MyMoreTitle weight="bold">계정 관리하기</MyMoreTitle>
      </MyMoreTop>
      <MyEditForm>
        <MyEditInputBox>
          {RenderInput({
            name: 'phoneNumber',
            placeholder: '전화번호',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          <Dropdown
            control={control}
            errors={errors}
            touchedFields={touchedFields}
            trigger={trigger}
            setValue={setValue}
            setFocus={setFocus}
            name="gender"
            placeholder="성별"
            options={['남성', '여성']}
            size="m"
            value={gender}
          />
          <DateInput
            control={control}
            errors={errors}
            touchedFields={touchedFields}
            trigger={trigger}
            setValue={setValue}
            setFocus={setFocus}
            name="birth"
            placeholder="생일"
            value={birth}
          />
          {RenderInput({
            name: 'name',
            placeholder: '이름',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          {RenderInput({
            name: 'passwordCheck',
            placeholder: '비밀번호',
            control,
            errors,
            touchedFields,
            trigger,
            secureTextEntry: true,
            returnKeyType: 'done',
          })}
          <MyAccountButton>
            <PrimaryTextButton size="m">계정 탈퇴하기</PrimaryTextButton>
          </MyAccountButton>
        </MyEditInputBox>
        <PrimaryButton
          size="l"
          onPress={handleSubmit(handleUpdate, handleFormError)}
          disabled={isButtonDisabled}>
          수정하기
        </PrimaryButton>
      </MyEditForm>
    </MyMoreContainer>
  );
}
