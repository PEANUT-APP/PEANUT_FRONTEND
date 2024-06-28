import React from 'react';
import {ScrollView} from 'react-native';
import GlobalView from '../../styles/GlobalStyle';
import {ContainerView} from './styles';
import CameraButton from '../../components/button/CameraButton';
import NavigationBar from '../../components/navigation/NavigationBar';
import {LayoutType} from './types';

export default function Layout({children, paddingBottom}: LayoutType) {
  return (
    <GlobalView>
      <ContainerView>
        <ScrollView contentContainerStyle={{paddingBottom}}>
          {children}
        </ScrollView>
        <CameraButton />
      </ContainerView>
      <NavigationBar />
    </GlobalView>
  );
}
