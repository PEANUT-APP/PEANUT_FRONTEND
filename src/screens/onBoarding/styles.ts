import styled from 'styled-components/native';
import {Body1} from '../../components/text/Text';

export const OnBoardingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
`;

export const OnBoardingBox = styled.View`
  gap: 8px;
`;

export const OnBoardingLogo = styled.View`
  margin-top: 136px;
`;

export const OnBoardingLoginBox = styled.View`
  gap: 8px;
  align-items: center;
`;

export const KakaoLoginBox = styled.TouchableOpacity`
  width: 350px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffe812;
  flex-direction: row;
  gap: 7px;
`;

export const KakaoLoginText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;
