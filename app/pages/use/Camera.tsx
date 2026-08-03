// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
// import { Camera } from 'expo-camera';
// import { CameraType } from 'expo-image-picker';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { CameraType } from 'expo-camera';
import PageHeader from 'src/components/header/PageHeader';
import Loader from 'src/components/loader/Loader';
import { COLORS, STYLES, STRINGS, ASSETS } from 'src';
import { useCamera } from 'src/contexts/pages';

const UseCamera: React.FC = () => {
  const styles = STYLES.ComponentCamera;

  const { state, setState, handle, setHandle, onTakePicture, onPickImage, onRequestHandle, onHandleEffectI } =
    useCamera();

  useEffect(() => {
    onHandleEffectI();
  }, []);

  return (
    <React.Fragment>
      {state.image ? (
        <View style={styles.previewView}>
          <PageHeader name={STRINGS.pageTitleCameraView} />

          {handle.isLoading && <Loader />}

          <Image
            source={{ uri: state.image }}
            style={{ height: '65%', margin: 20 }}
            contentFit="contain"
            onLoadEnd={() => setHandle({ isLoading: false })}
          />

          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => setState({ image: null })}>
              <Text style={[styles.text, { color: COLORS.red }]}>{STRINGS.delete}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneBtn} onPress={() => onRequestHandle()}>
              <Text style={styles.text}>{STRINGS.submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <React.Fragment>
          <PageHeader name={STRINGS.pageTitleCamera} />

          <Camera
            style={{ flex: 1 }}
            type={state.type}
            autoFocus
            renderToHardwareTextureAndroid
            shouldRasterizeIOS
            ratio="16:9"
            ref={(ref) => {
              handle.cameraRef = ref;
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => onPickImage()}>
                <Ionicons name={'images'} size={35} color={COLORS.clearWhite} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => onTakePicture()}>
                <Image source={ASSETS.camShutter} style={{ width: 100, height: 100 }} contentFit="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setState({
                    type: state.type === 'back' ? 'front' : 'back',
                  });
                }}
              >
                <Ionicons name="camera-reverse" size={40} color={COLORS.clearWhite} />
              </TouchableOpacity>
            </View>
          </Camera>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UseCamera;
