// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { STYLES, ASSETS } from 'src';
import { PropsRefreshPage } from 'src/types/Types';

const RefreshPage: React.FC<PropsRefreshPage> = ({ refreshing, onRefresh, text, showText }) => {
  const styles = STYLES.ComponentRefreshPage;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007AFF']} />}
    >
      <View style={styles.container}>
        <Image source={ASSETS.loadEllipsis} style={{ width: 50, height: 50 }} resizeMode="contain" />

        <Text style={styles.mainText}>{text}</Text>

        {showText && (
          <Animatable.View animation={'fadeIn'} duration={500} delay={5000}>
            <Text style={styles.text}>{showText}</Text>
          </Animatable.View>
        )}
      </View>
    </ScrollView>
  );
};

export default RefreshPage;
