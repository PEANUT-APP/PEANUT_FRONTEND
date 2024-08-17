import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {DropdownType} from './types';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import Input from '../input/Input';
import {validationRules} from '../../modules/validationRules';
import {TouchableOpacity} from 'react-native';
import DropdownField from './DropdownField';

const DropdownContainer = styled.View`
  position: relative;
`;

const DropdownList = styled.View`
  position: absolute;
  top: 76px;
  z-index: 20;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid ${colors.LineNomal};
  background-color: ${colors.white};
`;

export default function Dropdown({
  control,
  errors,
  touchedFields,
  trigger,
}: DropdownType) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [iconState, setIconState] = useState({
    color: colors.TextDisabled,
    rotation: 0,
  });

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prev => !prev);
    setIconState({
      color: !isDropdownVisible ? colors.primaryNormal : colors.TextDisabled,
      rotation: !isDropdownVisible ? 0 : 180,
    });
  }, [isDropdownVisible]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsDropdownVisible(false);
    setIconState({color: colors.TextDisabled, rotation: 0});
    trigger('gender');
  };

  return (
    <DropdownContainer>
      <Input
        placeholder="성별"
        name="gender"
        control={control}
        rules={validationRules.gender}
        errors={errors}
        editable={false}
        touchedFields={touchedFields}
        returnKeyType="next"
        trigger={trigger}
        secureTextEntry={false}
        value={selectedValue}
        icon={
          <TouchableOpacity
            style={{transform: [{rotate: `${iconState.rotation}deg`}]}}
            onPress={toggleDropdown}
            activeOpacity={1}>
            <DesignIcon type="drop" size="l" color={iconState.color} />
          </TouchableOpacity>
        }
        drop={true}
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        pointerEvents="none"
      />
      {isDropdownVisible && (
        <DropdownList>
          <DropdownField
            onPress={() => handleSelect('남성')}
            isSelected={selectedValue === '남성'}>
            남성
          </DropdownField>
          <DropdownField
            onPress={() => handleSelect('여성')}
            isSelected={selectedValue === '여성'}>
            여성
          </DropdownField>
        </DropdownList>
      )}
    </DropdownContainer>
  );
}
