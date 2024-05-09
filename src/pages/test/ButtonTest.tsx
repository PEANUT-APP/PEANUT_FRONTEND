import React from 'react';
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

const ViewBox = styled.View`
  align-items: center;
  gap: 10px;
  margin: 10px;
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
            <PrimaryButton size="l" style="left">
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="left">
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="left">
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" style="right">
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="right">
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="right">
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" style="both">
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="both">
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="both">
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
            <PrimaryButton size="l" style="left" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="left" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="left" disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" style="right" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="right" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="right" disabled>
              Label
            </PrimaryButton>
          </ViewBox>
          <ViewBox>
            <PrimaryButton size="l" style="both" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="m" style="both" disabled>
              Label
            </PrimaryButton>
            <PrimaryButton size="s" style="both" disabled>
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
            <SecondaryButton size="l" style="left">
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="left">
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="left">
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" style="right">
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="right">
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="right">
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" style="both">
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="both">
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="both">
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
            <SecondaryButton size="l" style="left" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="left" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="left" disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" style="right" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="right" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="right" disabled>
              Label
            </SecondaryButton>
          </ViewBox>
          <ViewBox>
            <SecondaryButton size="l" style="both" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="m" style="both" disabled>
              Label
            </SecondaryButton>
            <SecondaryButton size="s" style="both" disabled>
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
            <TertiaryButton size="l" style="left">
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="left">
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="left">
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" style="right">
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="right">
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="right">
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" style="both">
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="both">
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="both">
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
            <TertiaryButton size="l" style="left" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="left" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="left" disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" style="right" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="right" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="right" disabled>
              Label
            </TertiaryButton>
          </ViewBox>
          <ViewBox>
            <TertiaryButton size="l" style="both" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="m" style="both" disabled>
              Label
            </TertiaryButton>
            <TertiaryButton size="s" style="both" disabled>
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
            <OutlineButton size="m" style="left">
              Label
            </OutlineButton>
            <OutlineButton size="s" style="left">
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" style="right">
              Label
            </OutlineButton>
            <OutlineButton size="s" style="right">
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" style="both">
              Label
            </OutlineButton>
            <OutlineButton size="s" style="both">
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
            <OutlineButton size="m" style="left" disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" style="left" disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" style="right" disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" style="right" disabled>
              Label
            </OutlineButton>
          </ViewBox>
          <ViewBox>
            <OutlineButton size="m" style="both" disabled>
              Label
            </OutlineButton>
            <OutlineButton size="s" style="both" disabled>
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
            <PrimaryTextButton size="m" style="left">
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="left">
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" style="right">
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="right">
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" style="both">
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="both">
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
            <PrimaryTextButton size="m" style="left" disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="left" disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" style="right" disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="right" disabled>
              Label
            </PrimaryTextButton>
          </ViewBox>
          <ViewBox>
            <PrimaryTextButton size="m" style="both" disabled>
              Label
            </PrimaryTextButton>
            <PrimaryTextButton size="s" style="both" disabled>
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
            <AssistiveTextButton size="m" style="left">
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="left">
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" style="right">
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="right">
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" style="both">
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="both">
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
            <AssistiveTextButton size="m" style="left" disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="left" disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" style="right" disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="right" disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
          <ViewBox>
            <AssistiveTextButton size="m" style="both" disabled>
              Label
            </AssistiveTextButton>
            <AssistiveTextButton size="s" style="both" disabled>
              Label
            </AssistiveTextButton>
          </ViewBox>
        </ViewBox>
      </GlobalView>
    </ScrollView>
  );
}
