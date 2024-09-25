import React from 'react';
import Layout from '../layout/Layout';
import {
  MyBox,
  MyContainer,
  MyTop,
  MyUserInfo,
  MyUserInfoBox,
  MyUserInfoCommunity,
  MyUserInfoContentBox,
  MyUserInfoName,
  MyUserInfoText,
  MyUserList,
  MyUserProfile,
} from './styles';
import {View} from 'react-native';
import OutlineButton from '../../components/button/OutlineButton';
import MyCard from './card/MyCard';
import PatientCard from './card/PatientCard';
import MyListItem from '../../components/list/my/MyListItem';

export default function My() {
  return (
    <Layout paddingBottom={0}>
      <MyContainer>
        <MyBox>
          <MyTop>
            <MyUserInfoBox>
              <MyUserProfile
                source={require('../../assets/images/mainProfile.png')}
              />
              <View>
                <MyUserInfoName weight="bold">나는 땅콩님</MyUserInfoName>
                <MyUserInfo>
                  <MyUserInfoText>160cm</MyUserInfoText>
                  <MyUserInfoText>·</MyUserInfoText>
                  <MyUserInfoText>50kg</MyUserInfoText>
                </MyUserInfo>
              </View>
            </MyUserInfoBox>
            <OutlineButton size="s">정보 수정하기</OutlineButton>
          </MyTop>
          <MyUserInfoContentBox>
            <MyUserInfoCommunity>
              <MyCard navigate="">작성글</MyCard>
              <MyCard navigate="">좋아요</MyCard>
              <MyCard navigate="">댓글</MyCard>
            </MyUserInfoCommunity>
            <PatientCard />
            <MyUserList>
              <MyListItem onPress={() => {}}>계정 관리하기</MyListItem>
              <MyListItem onPress={() => {}}>알림 설정</MyListItem>
              <MyListItem onPress={() => {}}>로그아웃</MyListItem>
            </MyUserList>
          </MyUserInfoContentBox>
        </MyBox>
      </MyContainer>
    </Layout>
  );
}
