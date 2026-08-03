/**
 * @project      HRDotNet-Mobile
 * @description  Main Component for Pending
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 */

//--- React Native Modules
import React from 'react';
import { Text, FlatList, RefreshControl, View, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';
//--- Expo Icons Modules
import { MaterialCommunityIcons } from '@expo/vector-icons';
//--- Others Modules
import LoaderPage from '../../loader/LoaderPage';
import Note from 'src/components/note/Note';
import PayHistoryItem from 'src/components/item/PayHistoryItem';
import RecentPayItem from 'src/components/item/RecentPayItem';
import EndListNote from 'src/components/note/EndListNote';
import Loader from 'src/components/loader/Loader';
import { STYLES, STRINGS, COLORS, DateTimeUtils } from 'src';
import { PayslipDetailsItems, PayslipItems, PayslipStack } from 'src/types/Profile';
import { useProfile } from 'src/contexts/tabs';
import { ITIModal } from 'src/components/use/useModal';

const Payslip: React.FC<PayslipStack> = ({ navigation, item }) => {
  const styles = STYLES.ComponentPayslip;
  const { handle, setHandle, payslip, setPayslip, onFetchPayslipDetails } = useProfile();

  const onHandleMore = (itemId: number, employees: PayslipDetailsItems) => {
    onFetchPayslipDetails(itemId);
    navigation.navigate(STRINGS.pathPayslipDetails, { id: itemId, emp: employees });
  };

  const [show, setShow] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const [year, setYear] = React.useState([
    { label: 'All', value: '' },
    { label: '2023', value: '2023' },
    { label: '2024 ', value: '2024' },
    { label: '2025 ', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
  ]);

  return (
    <React.Fragment>
      {handle.isLoading ? (
        <Loader />
      ) : (
        <Animatable.View animation={'fadeIn'} style={styles.animatedView} duration={900}>
          <View style={[styles.topContainer, { paddingHorizontal: 10 }]}>
            <Pressable style={styles.searchContainer} onPress={() => setHandle({ isModalVisible: true })}>
              <MaterialCommunityIcons name="layers-search" size={20} color={COLORS.orange} />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>
                {payslip.filterText === '' ? 'Filter' : payslip.filterText}
              </Text>
            </Pressable>
          </View>

          {item.items.length > 0 && (
            <RecentPayItem
              data={item.items[0]}
              onHandleMore={() => {
                onHandleMore(item.items[0].id, payslip.item);
              }}
            />
          )}

          <Text style={styles.payHistoryTitle}>{STRINGS.payslipTitleFirst}</Text>

          {handle.isLoadMoreHistory ? (
            <LoaderPage />
          ) : payslip.data.total <= 0 ? (
            <Note text={STRINGS.nothingFound} icon="emoji-sad" />
          ) : (
            <FlatList
              data={item.items.filter((employee) => {
                const year = new Date(employee.timekeeping.cutOff.datePayoutSchedule);
                return payslip.filterText === '' || `${year.getFullYear()}` === payslip.filterText;
              })}
              renderToHardwareTextureAndroid
              refreshControl={
                <RefreshControl
                  refreshing={handle.isLoadMoreHistory!}
                  onRefresh={() => setHandle({ isLoadMoreHistory: true })}
                />
              }
              renderItem={({ item }: { item: PayslipItems }) => {
                return (
                  <React.Fragment>
                    <PayHistoryItem
                      data={item}
                      onHandleMore={() => onHandleMore(item.id, payslip.item)}
                      key={item.id}
                    />
                  </React.Fragment>
                );
              }}
              ListFooterComponent={<EndListNote />}
              keyExtractor={(item) => item.id.toString()}
            />
          )}

          <ITIModal
            visible={handle.isModalVisible}
            close={() => {
              setHandle({ isModalVisible: false });
              setPayslip({});
            }}
          >
            <DropDownPicker
              open={show}
              value={value}
              items={year as React.ComponentProps<typeof DropDownPicker>['items']}
              setOpen={setShow}
              setValue={setValue}
              setItems={setYear}
              modalAnimationType="fade"
              maxHeight={200}
              style={{
                borderColor: COLORS.lighterGray,
              }}
              zIndex={1000}
              textStyle={{ fontFamily: 'Inter_400Regular' }}
              placeholderStyle={{ color: COLORS.lighterGray }}
              placeholder={STRINGS.placeholderFilter}
            />
            <Pressable
              onPress={() => {
                setHandle({ isModalVisible: false });
                setPayslip({
                  filterText: value,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{STRINGS.filter}</Text>
            </Pressable>
          </ITIModal>
        </Animatable.View>
      )}
    </React.Fragment>
  );
};

export default Payslip;
