import React from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { BOTTOM_SHEET } from 'src/constants/styles/BottomSheet';

// Note: You need to Add This BottomSheet inside of an Animatable.View

//<Animatable.View animation={'fadeIn'} duration={900} style={styles.container}>
//</Animatable.View>

const BottomSheet = ({ children, setBottom }: { children: React.ReactNode; setBottom: number }) => {
  const bottomSheet = BOTTOM_SHEET.BottomSheet;
  const lastGestureDy = React.useRef(0);
  const DRAG_THRESHOLD = 50;
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const CLICK_THRESHOLD = 5;
  const TIME_THRESHOLD = 150;
  const startTime = React.useRef(0);

  const MAX_UPWARD_TRANSLATE_Y = setBottom;
  const MAX_DOWNWARD_TRANSLATE_Y = 0;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
        startTime.current = Date.now();
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        const elapsedTime = Date.now() - startTime.current;
        const movedDistance = Math.abs(gesture.dy);

        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (movedDistance < CLICK_THRESHOLD && elapsedTime < TIME_THRESHOLD) {
          //click
          if (lastGestureDy.current == 0) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          //swipe
          if (gesture.dy > 0) {
            // dragging down
            if (gesture.dy <= DRAG_THRESHOLD) {
              springAnimation('up');
            } else {
              springAnimation('down');
            }
          } else {
            // dragging up
            if (gesture.dy >= -DRAG_THRESHOLD) {
              springAnimation('down');
            } else {
              springAnimation('up');
            }
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View style={[bottomSheet.container, { height: '100%', bottom: setBottom }, bottomSheetAnimation]}>
      <View {...panResponder.panHandlers}>
        <Octicons name="horizontal-rule" size={38} color="gray" style={{ alignSelf: 'center' }} />
      </View>
      {children}
    </Animated.View>
  );
};

export default BottomSheet;
