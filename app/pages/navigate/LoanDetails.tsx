/**
 * @project      HRDotNet-Mobile
 * @description  Use Loan Fetch for the Loan Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 */

//--- React Modules
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

//-- Expo Modules
import { isLoading } from 'expo-font';

//--- Components
import Loader from 'src/components/loader/Loader';
import PageHeader from 'src/components/header/PageHeader';
import { DateTimeUtils, STRINGS } from 'src';
import { Utils } from 'src/utils/Utils';
import BottomSheet from 'src/components/bottom-sheet/BottomSheet';
import * as Animatable from 'react-native-animatable';
import { LoanLedgerInterface, PaymentHistories } from 'src/types/LoanLedger';
import { useLoanLedger } from 'src/contexts/pages';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { APIMethods, ContentTypes } from 'src/constants/Values';
import { LOAN_LEDGER } from 'src/constants/styles/LoanLedger';

const LoanDetails = () => {
  const params = useRoute().params as Readonly<LoanLedgerInterface>;
  const items = params;
  const styles = LOAN_LEDGER.LoanDetails(items.filing.filingStatus.name);
  const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistories[]>();
  const [count, setCount] = React.useState(0);
  const { handle, setHandle } = useLoanLedger();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_LOAN_LEDGER}/${items.filing.documentNo}/payment-history`,
        );
        setPaymentHistory(response.data.filing.paymentHistory);
        setCount(response.data.filing.paymentHistory.length);
        setHandle({ isLoadMore: false, isLoading: false });
      } catch (error) {
        console.error(error);
        setHandle({ isLoadMore: false, isLoading: false });
      }
    })();
  }, [handle.isLoadMore, handle, isLoading]);

  return (
    <View style={styles.mainContainer}>
      <PageHeader name={STRINGS.pageTitleLoanDetails} />

      <View style={styles.topContent}>
        <Text style={styles.topText}>{items.filing.loanClassification.name}</Text>

        <View style={styles.rowWrapper}>
          {Utils.loanStatusIcon(items.filing.filingStatus.name)}
          <Text style={styles.topText}>{items.filing.filingStatus.name}</Text>
        </View>
      </View>

      {handle.isLoadMore ? (
        <Loader />
      ) : (
        <Animatable.View animation={'fadeIn'} duration={900} style={styles.container}>
          <View style={styles.viewContainer}>
            <Shadow distance={2} offset={[1, 1]} style={styles.content}>
              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnSource}</Text>
                <Text style={styles.valueText}>{items.filing.loanSource.name}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnLoanCode}</Text>
                <Text style={styles.valueText}>{items.filing.loanClassification.code}</Text>
              </View>

              <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                <Text style={styles.titleText}>{STRINGS.cllnDocumentNo}</Text>
                <Text style={styles.valueText}>{items.filing.documentNo}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>Transaction Date: </Text>
                <Text style={styles.valueText}>{DateTimeUtils.dateDefaultToWord(items.filing?.dateTransaction)}</Text>
              </View>

              <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                <Text style={styles.titleText}>{STRINGS.cllnDateGranted}</Text>
                <Text style={styles.valueText}>{DateTimeUtils.dateDefaultToWord(items.filing.dateGranted)}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnFirstDueDate}</Text>
                <Text style={styles.valueText}>{DateTimeUtils.dateDefaultToWord(items.filing.dateFirstGranted)}</Text>
              </View>

              <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                <Text style={styles.titleText}>{STRINGS.cllnReferenceNo}</Text>
                <Text style={styles.valueText}>{items.filing.referenceNo}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnLoanAmount}</Text>
                <Text style={styles.valueText}>{Utils.amountFormat(items.filing.loanAmount)}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnDisbursedAmount}</Text>
                <Text style={styles.valueText}>{Utils.amountFormat(items.filing.disbursedAmount)}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnCycle}</Text>
                <Text style={styles.valueText}>{items.filing.cycle.name}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnPerMonth}</Text>
                <Text style={styles.valueText}>{Utils.amountFormat(items.filing.perMonth)}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnTotalInstallAmount}</Text>
                <Text style={styles.valueText}>{Utils.amountFormat(items.filing.totalAmount)}</Text>
              </View>

              <View style={styles.rowWrapper}>
                <Text style={styles.titleText}>{STRINGS.cllnBalance}</Text>
                <Text style={styles.valueText}>{Utils.amountFormat(items.filing.balance)}</Text>
              </View>
            </Shadow>
          </View>

          {count <= 0 ? (
            <></>
          ) : (
            <BottomSheet setBottom={-460}>
              <FlatList
                data={paymentHistory}
                style={{ marginHorizontal: 20 }}
                renderItem={({ item }: { item: PaymentHistories }) => (
                  <View style={styles.detailView}>
                    <Shadow distance={2} offset={[1, 1]} style={styles.shadowView}>
                      <View style={styles.topDetail}>
                        <Text style={styles.topText}>{items.filing.loanSource.name}</Text>

                        <View style={styles.topLeftDetail}>
                          <Text style={styles.topText}>{Utils.amountFormat(item.balance)}</Text>

                          <Text style={[styles.topText, { fontSize: 12 }]}>{STRINGS.remainingBalance}</Text>
                        </View>
                      </View>

                      <View style={styles.bodyDetail}>
                        <View style={styles.rowWrapper}>
                          <Text style={styles.boldText}>{STRINGS.cllnPaymentDate}</Text>
                          <Text style={styles.bodyText}>{DateTimeUtils.dateDefaultToWord(item.dateTransaction)}</Text>
                        </View>
                        <View style={styles.rowWrapper}>
                          <Text style={styles.boldText}>{STRINGS.cllnPaymentAmount}</Text>
                          <Text style={styles.bodyText}>{Utils.amountFormat(item.totalLoanAmount)}</Text>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                )}
              />
            </BottomSheet>
          )}
        </Animatable.View>
      )}
    </View>
  );
};

export default LoanDetails;
