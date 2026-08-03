/**
 * @project      HRDotNet-Mobile
 * @description  Use Loan Fetch for the Loan Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */
//--- React Components
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import PageHeader from 'src/components/header/PageHeader';
import Search from 'src/components/use/Search';
import Loader from 'src/components/loader/Loader';
import EndListNote from 'src/components/note/EndListNote';
import Note from 'src/components/note/Note';
import { STRINGS } from 'src';
import { useLoanLedger } from 'src/contexts/pages';
import { LOAN_LEDGER } from 'src/constants/styles/LoanLedger';
import LoanLedgerItems from 'src/components/item/LoanLedgerItem';
import { useFocusEffect } from 'expo-router';
import LoaderPage from 'src/components/loader/LoaderPage';

const LoanLedger: React.FC = () => {
  const main = LOAN_LEDGER.Main;

  const { state, setState, handle, setHandle, onDisplayLoanLedger, onHandleRefreshControl } = useLoanLedger();

  React.useEffect(() => {
    onDisplayLoanLedger();
  }, [handle.isRefreshing]);

  useFocusEffect(
    useCallback(() => {
      setHandle({ isLoading: true});
      const timeoutId = setTimeout(() => {
        setHandle({ isLoading: false });
      }, 800); 
      return () => clearTimeout(timeoutId);
    }, [])
  );
  
  const filteredItems = state.data.items.filter((item: any) => {
    const itemName = item.filing.loanClassification.name.toLowerCase();
    const filingStatus = item.filing.filingStatus.name.toLowerCase();
    const documentNo = item.filing.documentNo.toLowerCase();
    const filterText = state.filterText.toLowerCase();
    return itemName.includes(filterText) || filingStatus.includes(filterText) || documentNo.includes(filterText);
  });

  return (
    <View style={[main.container]}>
      <PageHeader name={STRINGS.pageTitleLoanLedger} />
      <View style={main.wrapper}>
        <View style={main.innerWrapper}>
          <Search filterText={state.filterText} setFilterText={setState} />
          {handle.isLoading ? (
            <LoaderPage />
          ) : (
            <React.Fragment>
              {state.totalCount > 0 ? (
                <View style={{height: '95%', paddingBottom: 15}}>
                  <FlatList
                    data={filteredItems}
                    onEndReachedThreshold={0.1}
                    renderToHardwareTextureAndroid
                    shouldRasterizeIOS
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    renderItem={({ item }: any) => <LoanLedgerItems item={item} />}
                    keyExtractor={(item) => item.filing.guid.toString()}
                    refreshControl={
                      <RefreshControl refreshing={handle.isLoading!} onRefresh={() => onHandleRefreshControl()} />
                    }
                    ListFooterComponent={<EndListNote />}
                  />
                </View>
              ) : (
                <Note text={STRINGS.nothingFound} icon="magnifying-glass" />
              )}
            </React.Fragment>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoanLedger;
LoanLedger;
