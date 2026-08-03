/**
 * @project      HRDotNet-Mobile
 * @description  Profile Panel for Main Component for Profile
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 */
//--- React Modules
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
//--- Others Modules
import TabHeader from 'src/components/header/TabHeader';
import Personal from 'src/components/panel/profile/Personal';
import Payslip from 'src/components/panel/profile/Payslip';
import { COLORS, STYLES, STRINGS } from 'src';
import { useProfile } from 'src/contexts/tabs';
import { ProfileTabStack } from 'src/types/Profile';

const Profile: React.FC<ProfileTabStack> = ({ navigation }) => {
  const styles = STYLES.Profile;
  const [isPanel, setPanel] = useState<number>(0);
  const { payslip, handle, onFetchPayslip } = useProfile();

  React.useEffect(() => {
    onFetchPayslip();
  }, [handle.isLoadMoreHistory, payslip.filterText]);

  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />
      <TabHeader headerName={STRINGS.tabTitleProfile} />

      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.buttonScroll}>
            <TouchableOpacity style={[styles.button, isPanel == 0 && styles.active]} onPress={() => setPanel(0)}>
              <Text style={[styles.textButton, isPanel == 0 && styles.textActive]}>{STRINGS.profileBtnOne}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, isPanel == 1 && styles.active]} onPress={() => setPanel(1)}>
              <Text style={[styles.textButton, isPanel == 1 && styles.textActive]}>{STRINGS.profileBtnTwo}</Text>
            </TouchableOpacity>
          </View>

          {isPanel == 0 ? (
            <Personal navigation={navigation} />
          ) : isPanel == 1 ? (
            <Payslip navigation={navigation} item={payslip.data} />
          ) : null}
        </View>
      </Animatable.View>
    </React.Fragment>
  );
};

export default Profile;
