/**
 * @description  ITIModal
 * @author       Anonymous
 * @date_created 10-17-2024
 */

import { FontAwesome } from '@expo/vector-icons';
import { Modal, StyleProp, TextStyle } from 'react-native';
import { View } from 'react-native-animatable';
import { COLORS } from 'src/constants/Colors';
import { STYLES } from 'src/constants/styles/Styles';

export const ITIModal = ({
  visible = false,
  close,
  children,
  style,
}: {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  const styles = STYLES.ComponentRequestSearch;
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => close()}
      hardwareAccelerated={true}
      animationType="fade"
    >
      <View style={styles.modalView}>
        <View style={styles.modalWrapper}>
          <FontAwesome
            name="close"
            size={20}
            color={COLORS.lighterGray}
            onPress={() => close()}
            style={styles.closeButton}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
};
