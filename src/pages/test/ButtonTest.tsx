import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import GlobalView from '../../styles/GlobalStyle';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import TertiaryButton from '../../components/button/TertiaryButton';
import OutlineButton from '../../components/button/OutlineButton';
import {
  AssistiveTextButton,
  PrimaryTextButton,
} from '../../components/button/TextButton';
import SelectButton from '../../components/button/SelectButton';
import NavigationButton from '../../components/button/NavigationButton';
import CameraButton from '../../components/camera/CameraButton';

const ViewBox = styled.View`
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const ViewBoxRow = styled.View`
  align-items: center;
  gap: 10px;
  margin: 10px;
  flex-direction: row;
`;

export function PrimaryButtonTest() {
  return (
    <ScrollView>
      <GlobalView>
        <Text>Primary Button</Text>
        <ViewBox>
          <ViewBox>
            <PrimaryButton size="l">Label</PrimaryButton>
            <PrimaryButton size="m">Label</PrimaryButton>
            <PrimaryButton size="s">Label</PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" left>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" left>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" left>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" right>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" right>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" right>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" left right>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" left right>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" left right>
              Label
            </PrimaryButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <PrimaryButton size="l" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" left disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" left disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" left disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" right disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" right disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" right disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" left right disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" left right disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" left right disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" isLoading>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" isLoading>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" isLoading>
              Label
            </PrimaryButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}

export function SecondaryButtonTest() {
  return (
    <ScrollView>
      <GlobalView>
        <Text>Secondary Button</Text>
        <ViewBox>
          <ViewBox>
            <SecondaryButton size="l">Label</SecondaryButton>
            <SecondaryButton size="m">Label</SecondaryButton>
            <SecondaryButton size="s">Label</SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" left>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" left>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" left>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" right>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" right>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" right>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" left right>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" left right>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" left right>
              Label
            </SecondaryButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <SecondaryButton size="l" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" left disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" left disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" left disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" right disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" right disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" right disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" left right disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" left right disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" left right disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" isLoading>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" isLoading>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" isLoading>
              Label
            </SecondaryButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}

export function TertiaryButtonTest() {
  return (
    <ScrollView>
      <GlobalView>
        <Text>Tertiary Button</Text>
        <ViewBox>
          <ViewBox>
            <TertiaryButton size="l">Label</TertiaryButton>
            <TertiaryButton size="m">Label</TertiaryButton>
            <TertiaryButton size="s">Label</TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" left>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" left>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" left>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" right>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" right>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" right>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" left right>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" left right>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" left right>
              Label
            </TertiaryButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <TertiaryButton size="l" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" left disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" left disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" left disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" right disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" right disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" right disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" left right disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" left right disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" left right disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" isLoading>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" isLoading>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" isLoading>
              Label
            </TertiaryButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}

export function OutlineButtonTest() {
  return (
    <ScrollView>
      <GlobalView>
        <Text>Outline Button</Text>
        <ViewBox>
          <ViewBox>
            <OutlineButton size="m">Label</OutlineButton>
            <OutlineButton size="s">Label</OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" left>
              Label
            </OutlineButton>
            <OutlineButton size="s" left>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" right>
              Label
            </OutlineButton>
            <OutlineButton size="s" right>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" left right>
              Label
            </OutlineButton>
            <OutlineButton size="s" left right>
              Label
            </OutlineButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <OutlineButton size="m" disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" left disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" left disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" right disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" right disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" left right disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" left right disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" isLoading>
              Label
            </OutlineButton>
            <OutlineButton size="s" isLoading>
              Label
            </OutlineButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}

export function TextButtonTest() {
  return (
    <ScrollView>
      <GlobalView>
        <Text>Primary Text Button</Text>
        <ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m">Label</PrimaryTextButton>
            <PrimaryTextButton size="s">Label</PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" left>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" left>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" right>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" right>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" left right>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" left right>
              Label
            </PrimaryTextButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" left disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" left disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" right disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" right disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" left right disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" left right disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
        </ViewBox>
        <Text>Assistive Text Button</Text>
        <ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m">Label</AssistiveTextButton>
            <AssistiveTextButton size="s">Label</AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" left>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" left>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" right>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" right>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" left right>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" left right>
              Label
            </AssistiveTextButton>
          </ViewBox>
        </ViewBox>
        <ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" left disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" left disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" right disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" right disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" left right disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" left right disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}

export function SelectButtonTest() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  return (
    <GlobalView>
      <Text>Selected Button</Text>
      <ViewBox>
        <ViewBox>
          <SelectButton
            isSelected={selectedId === 1}
            onPress={() => handleSelect(1)}>
            아침
          </SelectButton>
          <SelectButton
            isSelected={selectedId === 2}
            onPress={() => handleSelect(2)}>
            점심
          </SelectButton>
          <SelectButton
            isSelected={selectedId === 3}
            onPress={() => handleSelect(3)}>
            저녁
          </SelectButton>
        </ViewBox>
      </ViewBox>
    </GlobalView>
  );
}

export function NavigationButtonTest() {
  return (
    <GlobalView>
      <Text>Navigation Button</Text>
      <ViewBox>
        <ViewBoxRow>
          <NavigationButton type="medical" active={false} onPress={() => {}}>
            식단기록
          </NavigationButton>
          <NavigationButton type="home" active={false} onPress={() => {}}>
            홈
          </NavigationButton>
          <NavigationButton type="community" active={false} onPress={() => {}}>
            커뮤니티
          </NavigationButton>
          <NavigationButton type="my" active={false} onPress={() => {}}>
            마이
          </NavigationButton>
        </ViewBoxRow>
        <ViewBoxRow>
          <NavigationButton type="medical" active onPress={() => {}}>
            식단기록
          </NavigationButton>
          <NavigationButton type="home" active onPress={() => {}}>
            홈
          </NavigationButton>
          <NavigationButton type="community" active onPress={() => {}}>
            커뮤니티
          </NavigationButton>
          <NavigationButton type="my" active onPress={() => {}}>
            마이
          </NavigationButton>
        </ViewBoxRow>
      </ViewBox>
    </GlobalView>
  );
}

export function CameraButtonTest() {
  return (
    <GlobalView>
      <Text>Camera Button</Text>
      <ViewBox>
        <ViewBoxRow>
          <CameraButton />
        </ViewBoxRow>
      </ViewBox>
    </GlobalView>
  );
}
