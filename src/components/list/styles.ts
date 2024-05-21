import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Caption1, Caption2} from '../text/Text';

export const CommunityListContainer = styled.TouchableOpacity`
  position: relative;
  width: 350px;
  height: 83px;
  background-color: ${colors.white};
  border-radius: 8px;
  padding: 14px 14px;
`;

export const CommunityListBox = styled.View`
  flex-direction: row;
  gap: 15px;
`;

export const CommunityListContentBox = styled.View`
  flex: 1;
  gap: 2px;
`;

export const CommunityListName = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const CommunityListText = styled(Caption1)`
  line-height: 16.008px;
  letter-spacing: -0.3px;
`;

export const CommunityListResponse = styled.View`
  position: absolute;
  right: 14px;
  bottom: 10px;
  flex-direction: row;
  gap: 4px;
`;

export const CommunityListResponseBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const CommunityListResponseText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;

export const MyListContainer = styled.View`
  width: 350px;
  height: 48px;
  background-color: ${colors.white};
  border-radius: 6px;
  justify-content: center;
  padding: 0 24px;
`;

export const MyListBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const MyListText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
`;
