import styled from 'styled-components/native';
import {Title} from '../../components/text/Text';

export const SignContainer = styled.View`
  flex: 1;
  padding: 93px 20px 28px;
  justify-content: space-between;
  align-items: center;
`;

export const SignBox = styled.View`
  gap: 20px;
`;

export const SignTitleBox = styled.View`
  gap: 24px;
`;

export const SignTitleText = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
`;

export const SignFormBox = styled.View`
  gap: 16px;
`;

export const SignButtonBox = styled.View`
  gap: 8px;
`;
