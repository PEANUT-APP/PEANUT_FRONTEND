import React from 'react';
import GlobalView from '../../styles/GlobalStyle';
import {ContainerView} from './styles';
import NavigationBar from '../../components/navigation/NavigationBar';
import {LayoutType} from './types';

export default function Layout({children}: LayoutType) {
  return (
    <GlobalView>
      <ContainerView>{children}</ContainerView>
      <NavigationBar />
    </GlobalView>
  );
}
