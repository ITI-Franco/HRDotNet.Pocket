// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { STYLES } from 'src';

const TabHeader = ({ headerName }: { headerName: string }) => {
  const styles = STYLES.ComponentTabHeader;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.text}>{headerName}</Text>
    </View>
  );
};

export default TabHeader;
