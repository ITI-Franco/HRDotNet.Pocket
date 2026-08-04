// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useReducer, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Loader from 'src/components/loader/Loader';
import PageHeader from 'src/components/header/PageHeader';
import Note from 'src/components/note/Note';
import { COLORS, STRINGS, STYLES } from 'src';
import { Utils } from 'src/utils/Utils';
import { StateSelectionList, TypeHandle, TypeSelectionList, TypeNavProp } from 'src/types/Types';
import { APIMethods, ContentTypes, FieldLimit, ValuesSelectionList } from 'src/constants/Values';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { Ionicons } from '@expo/vector-icons';

const SelectionList: React.FC<TypeNavProp> = ({ navigation }) => {
  const styles = STYLES.ComponentSelectionList;
  const params = useRoute().params as never;
  const scrollViewRef = useRef(null);

  const [state, setState] = useReducer(
    (state: StateSelectionList, newState: Partial<StateSelectionList>) => ({ ...state, ...newState }),
    ValuesSelectionList(params).State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesSelectionList(params).Handle,
  );

  useEffect(() => {
    if ((params as any).currParams.onPanel == 0) {
      UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/schedules`)
        .then((response) => {
          if (Array.isArray(response.data.items)) {
            const mappedData = response.data.items.map((item: any, index: number) => ({
              ID: item.id,
              name: item.name,
              code: item.name,
            }));

            setState({ data: mappedData });
          } else {
            console.error('response.data.items is not an array');
          }
        })
        .catch(async (error: TypeError) => {
          console.error(error);
        });
    } else if ((params as any).currParams.onPanel == 1) {
      if ((params as any).action == 'OBRequest-Location') {
        UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/locations?Name=${encodeURIComponent(state.name ?? '')}`,
        )
          .then((response) => {
            const mappedData = response.data.items.map((item: any, index: number) => ({
              ID: item.id,
              name: item.name,
              code: item.name,
            }));
            setState({ data: mappedData });
          })
          .catch(async (error: TypeError) => {
            console.error(error);
          });
      } else if ((params as any).action == 'OBRequest-Branch') {
        UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/branches?Location=${(params as any).currParams.location.name}`,
        )
          .then((response) => {
            const mappedData = response.data.items.map((item: any, index: number) => ({
              ID: item.id,
              name: item.name,
              code: item.name,
            }));

            setState({ data: mappedData });
          })
          .catch(async (error: TypeError) => {
            console.error(error);
          });
      }
    } else if ((params as any).currParams.onPanel == 4) {
      UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_REQUEST}/leave-management/maintenance/leave-parameters`,
      )
        .then((response) => {
          const mappedData = response.data.items.map((item: any, index: number) => ({
            ID: item.id,
            name: item.name,
            code: item.code,
          }));
          setState({ data: mappedData });
        })
        .catch(async (error: TypeError) => {
          console.error(error);
        });
    }
  }, []);

  const renderItem = ({ item, index }: { item: TypeSelectionList; index: number }) => (
    <MemoizedRequestItem item={item} index={index} />
  );

  const MemoizedRequestItem = React.memo(({ item, index }: { item: TypeSelectionList; index: number }) => (
    <TouchableOpacity style={styles.button} onPress={() => Utils.setSelectionNavigate(params, navigation, item)}>
      <Text style={styles.titleText}>{item.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <React.Fragment>
      {handle.isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <PageHeader name={`${STRINGS.pageTitleSelectionList} ${(params as any).label ?? ''}`} />

          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            {UtilsDisplay.DisplayFieldTextInput(
              false,
              undefined,
              state?.name || '',
              true,
              (text: string) => setState({ name: text }),
              true,
              FieldLimit.reason.maxLength,
              `Enter ${(params as any).label ?? ''}`,
              false,
              <Ionicons name="search" size={26} color={COLORS.lighterGray} />,
            )}
          </View>
          {state.data.length > 0 ? (
            <FlatList
              ref={scrollViewRef}
              data={state.data}
              initialNumToRender={5}
              windowSize={10}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={30}
              removeClippedSubviews={true}
              onEndReachedThreshold={0.1}
              renderItem={renderItem}
            />
          ) : (
            <Note text={STRINGS.nothingFound} icon="magnifying-glass" />
          )}
        </View>
      )}
    </React.Fragment>
  );
};

export default SelectionList;
