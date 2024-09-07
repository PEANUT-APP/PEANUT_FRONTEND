import React from 'react';
import {ScrollView} from 'react-native';
import GlobalView from '../../styles/GlobalStyle';
import {ContainerView} from './styles';
import NavigationBar from '../../components/navigation/NavigationBar';
import {LayoutType} from './types';

export default function Layout({children, paddingBottom}: LayoutType) {
  return (
    <GlobalView>
      <ContainerView>
        <ScrollView contentContainerStyle={{paddingBottom}}>
          {children}
        </ScrollView>
      </ContainerView>
      <NavigationBar role="Patient" />
    </GlobalView>
  );
}
