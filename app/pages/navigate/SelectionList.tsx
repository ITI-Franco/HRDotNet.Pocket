// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useReducer, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Loader from 'src/components/loader/Loader';
import PageHeader from 'src/components/header/PageHeader';
import Note from 'src/components/note/Note';
import { COLORS, STRINGS, STYLES, ASSETS } from 'src';
import { Utils } from 'src/utils/Utils';
import { StateSelectionList, TypeHandle, TypeSelectionList, TypeNavProp } from 'src/types/Types';
import { APIMethods, ContentTypes, FieldLimit, ValuesSelectionList } from 'src/constants/Values';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import EndListNote from 'src/components/note/EndListNote';

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

  const processData = (mappedData: { ID: number; name: string; code: string }[]) => {
    setHandle({ isLoading: false });
    if (mappedData.length === 0 && state.data.length > 0) {
      setHandle({
        isLoadMore: false,
        isWaiting: false,
      });

      return;
    }

    setState({
      data: state.page || (1 > 1 && handle.isLoadMore) ? [...state.data, ...mappedData] : mappedData,
    });

    setHandle({
      isWaiting: false,
    });
  };
  const fetchData = (keyword: string) => {
    const search = encodeURIComponent(keyword);

    if ((params as any).currParams.onPanel == 0) {
      UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/schedules?Name=${search}&page=${state.page}&pageSize=30`,
      )
        .then((response) => {
          const mappedData = response.data.items.map((item: any) => ({
            ID: item?.id ?? '',
            name: item?.name ?? '',
            code: item?.name ?? '',
          }));
          processData(mappedData);
        })
        .catch((err) => {
          console.error(err);
          setHandle({ isLoading: false, isWaiting: false });
        })
        .finally(() => setHandle({ isLoading: false, isWaiting: false }));
    } else if ((params as any).currParams.onPanel == 1) {
      if ((params as any).action === 'OBRequest-Location') {
        UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/locations?Name=${search}&page=${state.page}&pageSize=30`,
        )
          .then((response) => {
            const mappedData = response.data.items.map((item: any) => ({
              ID: item?.id,
              name: item?.name ?? '',
              code: item?.name ?? '',
            }));

            processData(mappedData);
          })
          .catch(console.error);
      } else if ((params as any).action === 'OBRequest-Branch') {
        UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_REQUEST}/maintenance/branches?Location=${encodeURIComponent(
            (params as any).currParams.location.name,
          )}&Name=${search}&page=${state.page}&pageSize=30`,
        )
          .then((response) => {
            const mappedData = response.data.items.map((item: any) => ({
              ID: item?.id,
              name: item?.name ?? '',
              code: item?.name ?? '',
            }));

            processData(mappedData);
          })
          .catch(console.error);
      }
    } else if ((params as any).currParams.onPanel == 4) {
      UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_REQUEST}/leave-management/maintenance/leave-parameters?Name=${search}&page=${state.page}&pageSize=30`,
      )
        .then((response) => {
          const mappedData = response.data.items.map((item: any) => ({
            ID: item?.id,
            name: item?.name ?? '',
            code: item?.code ?? '',
          }));

          processData(mappedData);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(state.name ?? '');
    }, 500);

    return () => clearTimeout(timeout);
  }, [state.name, state.page]);

  const renderItem = ({ item, index }: { item: TypeSelectionList; index: number }) => (
    <MemoizedRequestItem item={item} index={index} />
  );

  const MemoizedRequestItem = React.memo(({ item }: { item: TypeSelectionList; index: number }) => (
    <TouchableOpacity style={styles.button} onPress={() => Utils.setSelectionNavigate(params, navigation, item)}>
      <Text style={styles.titleText}>{item?.name ?? ''}</Text>
    </TouchableOpacity>
  ));

  const onHandleSetReachedEnd = () => {
    setHandle({ isWaiting: true });
    setState({
      page: (state.page || 1) + 1,
    });
  };

  const ListFooterComponent = () => {
    return (
      <React.Fragment>
        {state.data.length <= 0 && !handle.isLoading && <Note text={STRINGS.nothingFound} icon="magnifying-glass" />}

        {handle.isWaiting && (
          <View style={styles.loader}>
            <Image source={ASSETS.loadEllipsis} style={{ width: 40, height: 40 }} />

            <Text style={styles.loaderText}>{STRINGS.loading}</Text>
          </View>
        )}

        {!handle.isLoadMore && state.data.length > 0 && <EndListNote />}
      </React.Fragment>
    );
  };

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
              onEndReached={() => {
                state.data.length >= Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) &&
                  handle.isLoadMore &&
                  !handle.isWaiting &&
                  state.data &&
                  onHandleSetReachedEnd();
              }}
              ListFooterComponent={ListFooterComponent}
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
