import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import TabHeader from 'src/components/header/TabHeader';
import { COLORS, STRINGS } from 'src/index';
import Entypo from '@expo/vector-icons/Entypo';

const Forbidden: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <React.Fragment>
      <TabHeader headerName="403 Forbidden" />

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          justifyContent: 'space-between',
          paddingVertical: 150,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Entypo name="lock" size={100} color="gray" />
          <Text style={{ fontSize: 25, fontWeight: 800 }}>Access to this page is restricted</Text>
        </View>

        <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: 40 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.orange,
              width: 170,
              padding: 10,
              marginVertical: 20,
              borderRadius: 20,
              gap: 10,
            }}
            onPress={() => navigation.navigate(STRINGS.pathTabStack)}
          >
            <Entypo name="arrow-left" size={25} color="white" />
            <Text
              style={{
                textTransform: 'uppercase',
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
                color: COLORS.clearWhite,
                textAlign: 'center',
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Forbidden;
