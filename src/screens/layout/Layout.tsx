/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import GlobalView from '../../styles/GlobalStyle';
import {ContainerView, ScrollView} from './styles';
import NavigationBar from '../../components/navigation/NavigationBar';
import {LayoutType} from './types';
import {RefreshControl} from 'react-native';

export default function Layout({children, refreshing, onRefresh}: LayoutType) {
  return (
    <GlobalView>
      <ContainerView>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
            />
          }>
          {children}
        </ScrollView>
      </ContainerView>
      <NavigationBar />
    </GlobalView>
  );
}
