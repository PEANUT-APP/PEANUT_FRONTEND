import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Heading, Title} from '../../components/text/Text';
import {TouchableOpacity} from 'react-native';

export const SearchContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.background};
`;

export const SearchBack = styled(TouchableOpacity)`
  position: absolute;
  top: 72px;
  left: 20px;
`;

export const SearchBox = styled.View`
  align-items: center;
  gap: 16px;
  padding: 72px 20px 0;
`;

export const SearchTop = styled.View`
  align-items: center;
  gap: 26px;
`;

export const SearchTitle = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNormal};
`;

export const SearchBottom = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  border-top-width: 1px;
  border-top-color: ${colors.LineDisabled};
  background-color: ${colors.white};
`;

export const SearchContentScroll = styled.ScrollView`
  flex: 1;
`;

export const SearchContent = styled.View`
  gap: 8px;
`;

export const SearchNoneImage = styled.View`
  margin-top: 84px;
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
`;

export const SearchOverlay = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 17, 17, 0.6);
`;

export const SearchModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 615px;
  background-color: ${colors.background};
  border-radius: 20px 20px 0px 0px;
  padding: 36px 20px 24px;
  align-items: center;
`;

export const SearchModalTop = styled.View`
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchModalNameBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`;

export const SearchModalFoodName = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  color: ${colors.TextNormal};
`;

export const SearchModalTopText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const SearchModalAmountBox = styled.View`
  width: 100px;
  flex-direction: row;
  padding: 12px 8px 11px 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.LineNomal};
`;

export const SearchModalInput = styled.TextInput`
  width: 48px;
  color: ${colors.TextNormal};
  padding: 0;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.4px;
`;

export const SearchModalFeedback = styled.View`
  margin-top: 16px;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const SearchModalFeedbackText = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.primaryNormal};
`;

export const SearchModalList = styled.View`
  margin: 12px 0 20px;
  gap: 8px;
`;

export const MealTextListItemContainer = styled.View`
  width: 350px;
  height: 48px;
  padding: 0 24px;
  border-radius: 6px;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
