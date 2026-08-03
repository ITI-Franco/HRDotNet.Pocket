// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useRef } from 'react';
import { Text, Animated, PanResponder } from 'react-native';

import { STYLES, ERRORS, STRINGS } from 'src';
import { PropsToast } from 'src/types/Types';

const Toast: React.FC<PropsToast> = ({ handle, setHandle }) => {
  const styles = STYLES.ComponentToast(handle.set);
  const pan = useRef(new Animated.Value(-200)).current;

  const onCloseToast = () => {
    Animated.timing(pan, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setHandle({ isToast: { ...handle, show: false } });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return gestureState.dy < -10;
      },
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        gestureState.dy < -50
          ? onCloseToast()
          : Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (handle.show) {
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        onCloseToast();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [handle]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: pan }] }]} {...panResponder.panHandlers}>
      <Text style={styles.title}>
        {handle.set === 0
          ? ERRORS.textError
          : handle.set === 1
            ? ERRORS.textNotice
            : handle.set === 2
              ? STRINGS.greetings
              : undefined}
      </Text>

      <Text style={styles.text}>{handle.message}</Text>
    </Animated.View>
  );
};

export default Toast;
