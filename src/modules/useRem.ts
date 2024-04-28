import {Dimensions} from 'react-native';

// 기본 폰트 사이즈를 정의합니다. 이 값은 디자인 가이드에 따라 조정할 수 있습니다.
const baseFontSize = 16;

// useREM 훅을 정의합니다.
const useRem = (rem: number) => {
  const screenWidth = Dimensions.get('window').width; // 화면의 너비를 얻습니다.
  const guidelineBaseWidth = 390; // 디자인 기준 너비입니다. 실제 디자인에 사용된 기준 너비로 조정하세요.

  const screenWidthRatio = screenWidth / guidelineBaseWidth; // 화면 너비에 대한 비율을 계산합니다.
  return rem * baseFontSize * screenWidthRatio; // 계산된 크기를 반환합니다.
};

export default useRem;
