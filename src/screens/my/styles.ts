import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Title} from '../../components/text/Text';

export const MyContainer = styled.View`
  flex: 1;
  padding: 64px 20px 0;
  align-items: center;
  background-color: ${colors.background};
`;

export const MyBox = styled.View`
  gap: 22px;
`;

export const MyTop = styled.View`
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MyUserInfoBox = styled.View`
  flex-direction: row;
  padding: 0 12px;
  gap: 12px;
`;

export const MyUserProfile = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: ${colors.SolidTertiaryActive};
`;

export const MyUserInfoName = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  margin: 13px 0 4px;
  color: ${colors.TextNormal};
`;

export const MyUserInfo = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const MyUserInfoText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNeutral};
`;

export const MyUserInfoContentBox = styled.View`
  gap: 12px;
`;

export const MyUserInfoCommunity = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const MyUserList = styled.View`
  gap: 8px;
`;

export const MyMoreContainer = styled.View<{color: string}>`
  flex: 1;
  padding: 72px 20px 28px;
  align-items: center;
  background-color: ${({color}) => color};
  gap: 20px;
`;

export const MyMoreTop = styled.View`
  width: 350px;
  gap: 20px;
`;

export const MyMoreTitle = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  color: ${colors.TextNormal};
`;

export const MyEditBox = styled.View``;

export const MyEditProfile = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: ${colors.SolidTertiaryActive};
  position: relative;
`;

export const MyEditIcon = styled.View`
  position: absolute;
  bottom: 3px;
  right: 4px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: ${colors.white};
  elevation: 3;
`;

export const MyEditForm = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const MyEditInputBox = styled.View`
  gap: 16px;
`;
