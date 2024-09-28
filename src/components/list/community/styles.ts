import styled from 'styled-components/native';
import {colors} from '../../../styles/colors';
import {Body1, Body2, Caption1, Caption2} from '../../text/Text';

export const CommunityListItemText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
  color: ${colors.TextDisabled};
`;

export const CommunityListItemContainer = styled.View`
  position: relative;
  width: 350px;
  height: 144px;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 20px;
  justify-content: space-between;
`;

export const CommunityListItemTitleBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const CommunityListItemTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const CommunityListItemDate = styled(CommunityListItemText)`
  margin-bottom: 8px;
`;

export const CommunityListItemContent = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;

export const CommunityListItemBottomBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CommunityListItemProfile = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const CommunityListItemImage = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommunityListItemNoneImage = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: #d9d9d9;
`;

export const CommunityListItemName = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;

export const CommunityListItemInfoBox = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const CommunityListItemInfoPair = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CommunityListItemCommentPair = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const OtherWriterContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 15px;
  width: 87px;
  height: 34px;
  border-radius: 3px;
  background-color: ${colors.white};
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const MeWriterContainer = styled.View`
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 15px;
  width: 87px;
  border-radius: 3px;
  background-color: ${colors.white};
  elevation: 5;
  align-items: center;
  justify-content: center;
`;

export const MeWriterBox = styled.TouchableOpacity`
  height: 34px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const WriterText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
  color: ${colors.TextNeutral};
`;
