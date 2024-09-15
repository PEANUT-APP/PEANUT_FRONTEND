import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {View} from 'react-native';

interface CustomGraphType {
  data: {x: number; y: number; hideDataPoint?: boolean}[];
  width: number;
  height: number;
  color: string;
}

const CustomGraph: React.FC<CustomGraphType> = ({
  data,
  width,
  height,
  color,
}) => {
  const linePoints = data
    .filter(point => !point.hideDataPoint)
    .map(
      (point, index) =>
        `${index * (width / (data.length - 1))},${height - point.y}`,
    )
    .join(' ');

  const pathData = `M ${linePoints}`;

  return (
    <View>
      <Svg width={width} height={height}>
        <G>
          <Path d={pathData} fill="none" stroke={color} strokeWidth="2" />
        </G>
      </Svg>
    </View>
  );
};

export default CustomGraph;
