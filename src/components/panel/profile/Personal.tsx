// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useReducer, useEffect } from 'react';
import { View, Text, FlatList, Modal, Animated } from 'react-native';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';
import { Skeleton } from 'moti/skeleton';

import LoaderPage from '../../loader/LoaderPage';
import { STYLES, STRINGS, ASSETS } from 'src';
import { useFetch } from 'src/hooks/useFetch';
import { ValuesPersonal, ValuesSchemaPersonal } from 'src/constants/Values';
import { TypeHandle, TypeNavStack } from 'src/types/Types';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheetOption from 'src/components/bottom-sheet/BottomSheetOptionProfile';
import { useProfile } from 'src/contexts/tabs';

import BottomSheetProfileUpdate from 'src/components/bottom-sheet/BottomSheetProfileUpdate';

const Personal: React.FC<TypeNavStack> = ({ navigation }) => {
  const styles = STYLES.ComponentPersonal;
  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesPersonal.Handle,
  );

  const { state, setState } = useProfile();
  const animation = new Animated.Value(100);

  useEffect(() => {
    if (handle.isLoading) {
      setState({ data: ValuesSchemaPersonal, details: [] });

      const timeoutId = setTimeout(async () => {
        try {
          setHandle({ isLoading: true });
          await useFetch.Personal(setState);
        } catch (error) {
          console.error(error);
        } finally {
          setHandle({ isLoading: false, refreshing: false });
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [handle.isLoading]);

  useEffect(() => {
    if (state.isUpdatingProfile) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state.isUpdatingProfile]);

  return (
    <View style={{ flex: 1 }}>
      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <Animatable.View animation={'fadeIn'} duration={900} style={styles.container}>
          <View style={styles.topView}>
            <View style={styles.imageView}>
              <View style={styles.wrapper}>
                <Skeleton show={handle.isLoading} width={180} height={180} colorMode="light" radius="round">
                  {state.uri ? (
                    <View>
                      <Image
                        source={{ uri: state.uri as string }}
                        cachePolicy={'disk'}
                        contentFit="cover"
                        style={{
                          width: 180,
                          height: 180,
                          alignSelf: 'center',
                          backfaceVisibility: 'hidden',
                        }}
                        transition={300}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        source={ASSETS.user}
                        cachePolicy={'disk'}
                        contentFit="cover"
                        style={styles.image}
                        transition={300}
                      />
                    </View>
                  )}
                </Skeleton>
              </View>
              <View
                style={{ position: 'absolute', bottom: 0, right: 10, backgroundColor: 'gray', borderRadius: 90 }}
                onTouchStart={() => {
                  setState({ bottomSheetOption: true });
                }}
              >
                <AntDesign name="camera" size={26} color="black" style={{ padding: 10 }} />
              </View>
            </View>

            <Text style={styles.nameText}>{state.data?.FullName}</Text>
            <Text style={styles.subText}>{state.data?.Name_Department}</Text>
            <Text style={styles.subText}>{state.data?.Code || STRINGS.none}</Text>
          </View>

          <View style={styles.bodyView} />

          <BottomSheetOption />
          <BottomSheetProfileUpdate />

          <FlatList
            data={state.details}
            persistentScrollbar={true}
            style={styles.infoView}
            contentContainerStyle={{ flexGrow: 0 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.contentText}>{item.value}</Text>
              </View>
            )}
          />
        </Animatable.View>
      )}
    </View>
  );
};

export default Personal;
