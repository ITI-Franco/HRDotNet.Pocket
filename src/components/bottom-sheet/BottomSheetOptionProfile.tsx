import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Button, Modal, Animated, Text } from 'react-native';
import { COLORS } from 'src/constants/Colors';
import { useProfile } from 'src/contexts/tabs';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ERRORS } from 'src/constants/Errors';
import { Style } from 'src/constants/styles/BottomSheetOptionProfile';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BottomSheetOptionProfile() {
    const AnimatedView = Animated.createAnimatedComponent(View);
    const { state, setState } = useProfile();
    const animation = new Animated.Value(100);
    const styles = Style.styles;

    useEffect(() => {
        if (state.bottomSheetOption) {
            Animated.timing(animation, {
                toValue: -20,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [state.bottomSheetOption])

    const onCameraPress = async () => {
        try {
            await ImagePicker.
                requestCameraPermissionsAsync();
            let result = await ImagePicker.
                launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            if (!result.canceled) {
                setState({ uri: result.assets[0].uri, bottomSheetOption: false, isUpdatingProfile: true })
            }
        } catch ({ message }) {
           alert("Camera access is required. Please enable it in your device settings.")
        }
    }

    const onFilePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setState({ uri: result.assets[0].uri, bottomSheetOption: false, isUpdatingProfile: true })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal visible={state.bottomSheetOption} animationType="fade" transparent={true}>
                <View style={styles.viewContainer}
                    onTouchStart={() => { setState({ bottomSheetOption: false }) }}
                >

                    <AnimatedView
                        style={{ ...styles.animatedView, transform: [{ translateY: animation }], }}
                        onTouchStart={(e) => { e.stopPropagation() }}
                    >
                        <View style={styles.button} onTouchStart={() => onCameraPress()}>
                            <View style={{ flexDirection: 'row', gap: 15, width: 100, }} >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5 name="camera" size={24} color={COLORS.blue} />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.blue }}>{'Camera'}</Text>
                            </View>
                        </View>

                        <View style={{ height: 1, backgroundColor: COLORS.darkGray, width: '100%', }} />

                        <View style={styles.button} onTouchStart={() => onFilePress()}>
                            <View style={{ flexDirection: 'row', gap: 15, width: 100 }} >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5 name="file-upload" size={24} color={COLORS.green} />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{'Upload'}</Text>
                            </View>
                        </View>
                    </AnimatedView>

                    <AnimatedView
                        style={{ ...styles.animatedView2, transform: [{ translateY: animation }], }}
                        onTouchStart={(e) => { e.stopPropagation() }}
                    >
                        <View style={styles.button2} onTouchStart={() => { setState({ bottomSheetOption: false }) }}>
                            <View style={{ width: 30, alignItems: 'center' }}>
                                <MaterialIcons name="cancel" size={24} color={COLORS.darkGray} />
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.darkGray }}>{'Cancel'}</Text>
                        </View>
                    </AnimatedView>

                </View>
            </Modal>
        </View>
    );
}