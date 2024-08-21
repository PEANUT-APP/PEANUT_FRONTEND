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
  setValue,
  setFocus,
}: DropdownType) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [dropType, setDropType] = useState<'dropClose' | 'dropOpen'>(
    'dropClose',
  );

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prevState => {
      const newState = !prevState;
      setDropType(newState ? 'dropOpen' : 'dropClose');
      setFocus('gender');
      return newState;
    });
  }, [setFocus]);

  const handleSelect = async (value: string) => {
    setSelectedValue(value);
    setIsDropdownVisible(false);
    setDropType('dropClose');

    setValue('gender', value);
    await trigger('gender');
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
          <TouchableOpacity onPress={toggleDropdown} activeOpacity={1}>
            <DesignIcon type={dropType} size="l" />
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
