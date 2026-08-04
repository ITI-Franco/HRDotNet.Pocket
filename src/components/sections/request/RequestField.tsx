// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';

import { STYLES } from 'src';
import { Utils } from 'src/utils/Utils';
import { TypeObjectValues } from 'src/types/Types';

const RequestField: React.FC<TypeObjectValues> = ({ title, inputValue, isInputCheck, withAsterisk }) => {
  const styles = STYLES.ComponentTitleInput;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {((isInputCheck && !inputValue) || withAsterisk) && Utils.requestFieldError()}
    </View>
  );
};

export default RequestField;
