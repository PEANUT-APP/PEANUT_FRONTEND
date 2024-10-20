import styled from 'styled-components/native';
import {Body1, Title} from '../../components/text/Text';
import {colors} from '../../styles/colors';

export const SignContainer = styled.View<{isComplete?: boolean}>`
  flex: 1;
  padding: ${({isComplete}) => (isComplete ? '141px' : '93px')} 20px 28px;
  justify-content: space-between;
  align-items: center;
`;

export const SignBox = styled.View`
  gap: 20px;
`;

export const SignTitleBox = styled.View`
  width: 350px;
  gap: 24px;
`;

export const SignTitlePair = styled.View`
  gap: 8px;
`;

export const SignSubtitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${colors.TextNeutral};
`;

export const ConnectTitleBox = styled.View`
  gap: 8px;
`;

export const SignTitleText = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
`;

export const ConnectTitleText = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const SignFormBox = styled.View`
  gap: 16px;
  align-items: center;
`;

export const SignButtonBox = styled.View`
  gap: 8px;
`;

export const SignCompleteIcon = styled.View`
  margin-top: 72px;
`;
