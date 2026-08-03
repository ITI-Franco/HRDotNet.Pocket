import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Modal, Animated, Text } from 'react-native';
import { COLORS } from 'src/constants/Colors';
import { useProfile } from 'src/contexts/tabs';
import { Style } from 'src/constants/styles/BottomSheetProfileUpdate';
import { useFetch } from 'src/hooks/useFetch';

export default function BottomSheetProfileUpdate() {
    const AnimatedView = Animated.createAnimatedComponent(View);
    const { state, setState, updateProfile } = useProfile();
    const animation = new Animated.Value(-20);
    const styles = Style.styles;

    useEffect(() => {
        if (state.isUpdatingProfile) {
            Animated.timing(animation, {
                toValue: -20,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [state.isUpdatingProfile])

    return (
        <View style={{ flex: 1 }}>
            <Modal visible={state.isUpdatingProfile} animationType="fade" transparent={true}>
                <View style={styles.viewContainer}
                >
                    <AnimatedView
                        style={{ ...styles.animatedView, transform: [{ translateY: animation }], }}
                    >

                        <View style={styles.View} onTouchStart={async () => {
                            setState({ isUpdatingProfile: false });
                            updateProfile();
                        }}>
                            <View style={{ flexDirection: 'row', gap: 15, width: 100 }} >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5 name="check" size={24} color={COLORS.green} />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>{'Confirm'}</Text>
                            </View>
                        </View>


                        <View style={{
                            height: 1,
                            backgroundColor: COLORS.darkGray,
                            width: '100%',
                        }} />

                        <View style={styles.View} onTouchStart={() => { 
                                setState({ isUpdatingProfile: false }); 
                                useFetch.Personal(setState);
                            }}>
                            <View style={{ width: 30, alignItems: 'center' }}>
                                <FontAwesome5 name="trash" size={24} color={COLORS.darkGray} />
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.darkGray }}>{'Cancel'}</Text>
                        </View>

                    </AnimatedView>
                </View>
            </Modal>
        </View>
    );
}