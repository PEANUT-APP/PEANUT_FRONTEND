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
import {useAuth} from '../../modules/useAuth';
import {useMy} from './hooks';

export default function My() {
  const {handleLogout} = useAuth();
  const {handleGoEdit, handleGoNotice, handleGoAccount} = useMy();

  return (
    <Layout>
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
            <OutlineButton size="s" onPress={handleGoEdit}>
              정보 수정하기
            </OutlineButton>
          </MyTop>
          <MyUserInfoContentBox>
            <MyUserInfoCommunity>
              <MyCard navigate="MyArticle" title="작성한 글">
                작성글
              </MyCard>
              <MyCard navigate="MyGood" title="좋아요한 글">
                좋아요
              </MyCard>
              <MyCard navigate="MyComment" title="댓글 단 글">
                댓글
              </MyCard>
            </MyUserInfoCommunity>
            <PatientCard />
            <MyUserList>
              <MyListItem onPress={() => {}}>보호자 연결하기</MyListItem>
              <MyListItem onPress={handleGoAccount}>계정 관리하기</MyListItem>
              <MyListItem onPress={handleGoNotice}>알림 설정</MyListItem>
              <MyListItem onPress={handleLogout}>로그아웃</MyListItem>
            </MyUserList>
          </MyUserInfoContentBox>
        </MyBox>
      </MyContainer>
    </Layout>
  );
}
