import React from 'react';
import {
  CommunityListItemContainer,
  CommunityListItemContent,
  CommunityListItemDate,
  CommunityListItemImage,
  CommunityListItemBottomBox,
  CommunityListItemName,
  CommunityListItemProfile,
  CommunityListItemTitle,
  CommunityListItemTitleBox,
  CommunityListItemInfoBox,
  CommunityListItemText,
} from './styles';
import DesignIcon from '../../icon/DesignIcon';
import {colors} from '../../../styles/colors';
import {View} from 'react-native';

export default function CommunityListItem() {
  return (
    <CommunityListItemContainer>
      <View>
        <CommunityListItemTitleBox>
          <CommunityListItemTitle
            weight="bold"
            ellipsizeMode="tail"
            numberOfLines={1}>
            인슐린 주사를 까먹고 안 놨어요
          </CommunityListItemTitle>
          <DesignIcon type="kebab" size="l" color={colors.TextDisabled} />
        </CommunityListItemTitleBox>
        <CommunityListItemDate>2024.09.04 오후 11:30</CommunityListItemDate>
        <CommunityListItemContent ellipsizeMode="tail" numberOfLines={1}>
          아침에 인슐린 주사를 맞았어야 했는데 제가 급하게 학교를 가느라고
        </CommunityListItemContent>
      </View>
      <CommunityListItemBottomBox>
        <CommunityListItemProfile>
          <CommunityListItemImage />
          <CommunityListItemName>울적한 땅콩</CommunityListItemName>
        </CommunityListItemProfile>
        <CommunityListItemInfoBox>
          <View>
            <DesignIcon type="like" size="s" color={colors.LineNomal} />
            <CommunityListItemText>9,999+</CommunityListItemText>
          </View>
          <View>
            <DesignIcon type="comment" size="s" color={colors.LineNomal} />
            <CommunityListItemText>9,999+</CommunityListItemText>
          </View>
        </CommunityListItemInfoBox>
      </CommunityListItemBottomBox>
    </CommunityListItemContainer>
  );
}
