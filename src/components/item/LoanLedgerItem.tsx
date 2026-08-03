/**
 * @project      HRDotNet-Mobile
 * @description  Use Loan Fetch for the Loan Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */
//-- React Components
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-shadow-2';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
//--- Expo Component
import { useNavigation } from 'expo-router';
//--- Other Components
import { STRINGS } from 'src';
import { Utils } from 'src/utils/Utils';
import { LOAN_LEDGER } from 'src/constants/styles/LoanLedger';
import { LoanLedgerInterface } from 'src/types/LoanLedger';

const LoanLedgerItems = ({ item }: { item: LoanLedgerInterface }) => {
  const styles = LOAN_LEDGER.LoanItem(item);
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => (navigation as NavigationProp<ParamListBase>).navigate(STRINGS.pathLoanDetails, item)}>
      <Animatable.View
        style={styles.itemContainer}
        key={item.filing.guid}
        animation={'fadeIn'}
        duration={500}
      >
        <Shadow distance={2.5} offset={[1, 1]} style={styles.itemWrapper}>
          <View style={styles.dateRowWrapper}>
            <Text style={styles.currDateText}>{item.filing.loanClassification.name}</Text>

            <View style={styles.rowWrapper}>
              {Utils.loanStatusIcon(item.filing.filingStatus.name)}
              <Text style={styles.statusText}>{item.filing.filingStatus.name}</Text>
            </View>
          </View>

          <View style={styles.bodyWrapper}>

            <View style={styles.rowWrapper}>
              <Text style={styles.boldText}>{STRINGS.cllnDocumentNo}</Text>
              <Text style={styles.valueText}>{item.filing.documentNo}</Text>
            </View>

            <View style={styles.rowWrapper}>
              <Text style={styles.boldText}>{STRINGS.cllnBalance}</Text>
              <Text style={styles.valueText}>
                {STRINGS.php}
                {Utils.amountFormat(item.filing.balance)}
              </Text>
            </View>

          </View>
        </Shadow>
      </Animatable.View>
    </Pressable>
  );
};

export default LoanLedgerItems;
