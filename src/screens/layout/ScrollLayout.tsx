import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import GlobalView from '../../styles/GlobalStyle';
import {ContainerView} from './styles';
import NavigationBar from '../../components/navigation/NavigationBar';
import {ScrollLayoutType} from './types';

export default function ScrollLayout({
  children,
  paddingBottom,
  refreshing,
  onRefresh,
}: ScrollLayoutType) {
  return (
    <GlobalView>
      <ContainerView>
        <ScrollView
          contentContainerStyle={{paddingBottom}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {children}
        </ScrollView>
      </ContainerView>
      <NavigationBar />
    </GlobalView>
  );
}
