import React from 'react';
import {
  MyEditForm,
  MyEditIcon,
  MyEditInputBox,
  MyEditNoneProfile,
  MyEditProfile,
  MyMoreContainer,
  MyMoreTitle,
  MyMoreTop,
} from './styles';
import {TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {useBackHandler} from '../../modules/commonHooks';
import {colors} from '../../styles/colors';
import PrimaryButton from '../../components/button/PrimaryButton';
import RenderInput from '../../modules/renderInput';
import {useMyEdit} from './hooks';

export default function MyEdit() {
  const {handleBack} = useBackHandler();
  const {
    control,
    trigger,
    errors,
    touchedFields,
    handleProfilePress,
    profileImage,
    onSubmit,
    isButtonDisabled,
  } = useMyEdit();

  return (
    <MyMoreContainer color="#fff">
      <MyMoreTop>
        <TouchableOpacity activeOpacity={1} onPress={handleBack}>
          <DesignIcon type="back" size="l" color={colors.TextNeutral} />
        </TouchableOpacity>
        <MyMoreTitle weight="bold">정보 수정하기</MyMoreTitle>
      </MyMoreTop>
      <TouchableOpacity activeOpacity={1} onPress={handleProfilePress}>
        {profileImage ? (
          <MyEditProfile source={{uri: profileImage}} />
        ) : (
          <MyEditNoneProfile />
        )}
        <MyEditIcon>
          <DesignIcon type="pencil" size="s" color={colors.TextNeutral} />
        </MyEditIcon>
      </TouchableOpacity>
      <MyEditForm>
        <MyEditInputBox>
          {RenderInput({
            name: 'nickname',
            placeholder: '닉네임',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          {RenderInput({
            name: 'height',
            placeholder: '키',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
          {RenderInput({
            name: 'weight',
            placeholder: '몸무게',
            control,
            errors,
            touchedFields,
            trigger,
            returnKeyType: 'done',
          })}
        </MyEditInputBox>
        <PrimaryButton size="l" onPress={onSubmit} disabled={isButtonDisabled}>
          수정하기
        </PrimaryButton>
      </MyEditForm>
    </MyMoreContainer>
  );
}
