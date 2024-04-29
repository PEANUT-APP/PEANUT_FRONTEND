import React from 'react';
import styled from 'styled-components/native';
import {Text, ScrollView} from 'react-native';
import NullIcon from '../../components/icon/NullIcon';
import LoadingIcon from '../../components/icon/LoadingIcon';

const ViewContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 10px;
`;

const ViewBox = styled.View`
  align-items: center;
  gap: 10px;
`;

export default function IconTest() {
  return (
    <ScrollView>
      <Text>NullIcon</Text>
      <ViewContainer>
        <ViewBox>
          <NullIcon type="primary" size="xl" />
          <NullIcon type="primary" size="l" />
          <NullIcon type="primary" size="m" />
          <NullIcon type="primary" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="secondary" size="xl" />
          <NullIcon type="secondary" size="l" />
          <NullIcon type="secondary" size="m" />
          <NullIcon type="secondary" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="tertiary" size="xl" />
          <NullIcon type="tertiary" size="l" />
          <NullIcon type="tertiary" size="m" />
          <NullIcon type="tertiary" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="outline" size="xl" />
          <NullIcon type="outline" size="l" />
          <NullIcon type="outline" size="m" />
          <NullIcon type="outline" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="primaryDisabled" size="xl" />
          <NullIcon type="primaryDisabled" size="l" />
          <NullIcon type="primaryDisabled" size="m" />
          <NullIcon type="primaryDisabled" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="secondaryDisabled" size="xl" />
          <NullIcon type="secondaryDisabled" size="l" />
          <NullIcon type="secondaryDisabled" size="m" />
          <NullIcon type="secondaryDisabled" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="tertiaryDisabled" size="xl" />
          <NullIcon type="tertiaryDisabled" size="l" />
          <NullIcon type="tertiaryDisabled" size="m" />
          <NullIcon type="tertiaryDisabled" size="s" />
        </ViewBox>
        <ViewBox>
          <NullIcon type="outlineDisabled" size="xl" />
          <NullIcon type="outlineDisabled" size="l" />
          <NullIcon type="outlineDisabled" size="m" />
          <NullIcon type="outlineDisabled" size="s" />
        </ViewBox>
      </ViewContainer>
      <Text>Loading</Text>
      <ViewContainer>
        <ViewBox>
          <LoadingIcon type="primaryLoading" size="l" />
          <LoadingIcon type="primaryLoading" size="m" />
          <LoadingIcon type="primaryLoading" size="s" />
        </ViewBox>
        <ViewBox>
          <LoadingIcon type="secondaryLoading" size="l" />
          <LoadingIcon type="secondaryLoading" size="m" />
          <LoadingIcon type="secondaryLoading" size="s" />
        </ViewBox>
        <ViewBox>
          <LoadingIcon type="tertiaryLoading" size="l" />
          <LoadingIcon type="tertiaryLoading" size="m" />
          <LoadingIcon type="tertiaryLoading" size="s" />
        </ViewBox>
        <ViewBox>
          <LoadingIcon type="tertiaryLoading" size="l" />
          <LoadingIcon type="tertiaryLoading" size="m" />
          <LoadingIcon type="tertiaryLoading" size="s" />
        </ViewBox>
      </ViewContainer>
    </ScrollView>
  );
}
