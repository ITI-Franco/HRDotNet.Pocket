// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { STRINGS, STYLES } from 'src';

import PageHeader from 'src/components/header/PageHeader';

const AboutUs: React.FC = () => {
  const styles = STYLES.AboutUs;

  return (
    <View style={styles.main}>
      <PageHeader name={STRINGS.pageTitleAboutUs} />

      <ScrollView>
        <View style={styles.container}>
          <Shadow distance={3} style={styles.shadowView}>
            <Text style={styles.titleText}>{STRINGS.HRDotNet}</Text>

            <View>
              <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleI}</Text>
              <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
            </View>

            <View>
              <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleII}</Text>
              <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
            </View>

            <View>
              <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleIII}</Text>
              <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
            </View>

            <View>
              <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleIV}</Text>

              <Text style={styles.boldText}>{STRINGS.designedBy}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.alex}</Text>

              <Text style={[styles.boldText, { marginTop: 20 }]}>{STRINGS.developedBy}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.patrick}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.jess}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.vin}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.dane}</Text>
              <Text style={[styles.regularText, styles.indentText]}>{STRINGS.emman}</Text>
            </View>
          </Shadow>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
