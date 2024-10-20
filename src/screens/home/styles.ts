import styled from 'styled-components/native';

export const HomeBox = styled.View`
  flex: 1;
  gap: 12px;
`;

export const HomeTop = styled.ImageBackground`
  height: 207px;
  justify-content: space-between;
  padding: 45px 36px 24px;
`;

export const HomeIcons = styled.View`
  flex-direction: row;
  gap: 21px;
  justify-content: flex-end;
  align-items: center;
`;

export const HomeContent = styled.View`
  flex: 1;
  align-items: center;
  gap: 12px;
  padding-bottom: 28px;
`;

export const ReportCardBox = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const HomeLoadingScreen = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
  background: rgba(34, 34, 34, 0.1);
  z-index: 100;
`;
