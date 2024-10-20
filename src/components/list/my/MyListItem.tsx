import React from 'react';
import {MyListItemContainer, MyListItemText} from './styles';
import {MyListItemType} from './types';
import MyProtector from '../../../assets/images/MyProtector.svg';
import MyAccount from '../../../assets/images/MyAccount.svg';
import MyNotification from '../../../assets/images/MyNotification.svg';
import Logout from '../../../assets/images/Logout.svg';

const renderIcon = (label: string) => {
  switch (label) {
    case '보호자 연결하기':
      return <MyProtector />;
    case '계정 관리하기':
      return <MyAccount />;
    case '알림 설정':
      return <MyNotification />;
    case '로그아웃':
      return <Logout />;
    default:
      return null;
  }
};

export default function MyListItem({children, onPress}: MyListItemType) {
  return (
    <MyListItemContainer activeOpacity={1} onPress={onPress}>
      {renderIcon(children)}
      <MyListItemText>{children}</MyListItemText>
    </MyListItemContainer>
  );
}
