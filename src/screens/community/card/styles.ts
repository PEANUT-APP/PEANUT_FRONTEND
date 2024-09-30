import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Body2, Caption1, Caption2} from '../../../components/text/Text';

export const CommunityCardContainer = styled.View`
  width: 350px;
  border-radius: 8px;
  padding: 20px;
  align-items: center;
  gap: 12px;
  background-color: ${colors.white};
`;

export const CommunityCardTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CommunityCardUserInfoBox = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;

export const CommunityCardUserProfile = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommunityCardUserNoneProfile = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommunityCardName = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const CommunityCardDate = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${colors.TextDisabled};
`;

export const CommunityCardContentBox = styled.View`
  width: 100%;
  padding: 0 10px 0 8px;
  gap: 8px;
`;

export const CommunityCardTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const CommunityCardContent = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const CommunityCardLikeBox = styled.View`
  width: 100%;
  padding: 0 10px 0 8px;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const CommunityCardLike = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextDisabled};
`;
