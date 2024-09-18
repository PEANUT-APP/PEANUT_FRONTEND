import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Heading} from '../../components/text/Text';
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
