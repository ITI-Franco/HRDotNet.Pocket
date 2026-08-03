// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';

import { COLORS, STYLES } from 'src';

const Loader: React.FC = () => {
  const styles = STYLES.ComponentLoader;
  const [onVisibile, setVisible] = useState(true);

  const onHandleClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <ActivityIndicator size={'large'} color={COLORS.darkGray} />
          </View>
        </View>
    </React.Fragment>
  );
};

export default Loader;
