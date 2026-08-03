// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View } from 'react-native';
import { COLORS } from 'src/constants/Colors';
import { PropsLine } from 'src/types/Types';

const Line: React.FC<PropsLine> = ({ width, space, horizontalSpace, opacity }) => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomColor: COLORS.lighterGray,
        borderBottomWidth: width || 1.5,
        marginVertical: space || 5,
        marginHorizontal: horizontalSpace ?? 0,
        opacity: opacity,
      }}
    />
  );
};

export default Line;
