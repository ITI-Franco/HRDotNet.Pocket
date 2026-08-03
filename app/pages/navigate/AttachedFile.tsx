// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';

import PageHeader from 'src/components/header/PageHeader';
import MaterialIconsNote from 'src/components/note/MaterialIconsNote';
import { ARRAY, STYLES, STRINGS, COLORS } from 'src';
import { ValuesAttachedFile } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { TypeHandle, ParamsAttachedFile, SchemaFileAttachment } from 'src/types/Types';

const AttachedFile: React.FC = () => {
  const styles = STYLES.AttachedFile;

  const params = useRoute().params as ParamsAttachedFile;

  const attachment: string = params?.filing?.fileAttachment;
  const parsed: Array<SchemaFileAttachment> = JSON.parse(
    attachment && attachment !== STRINGS.undefined ? attachment : '[]',
  );

  const [file, setFile] = useState<string>(ValuesAttachedFile.State.file);
  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesAttachedFile.Handle,
  );

  const onHandleDownload = async () => {
    Linking.openURL(file).catch((error) => {
      alert(error);
    });
  };

  useEffect(() => {
    (async () => {
      await useFetch.LoadFileAttach(setFile, params, parsed, setHandle);
    })();
  }, []);

  return (
    <React.Fragment>
      <PageHeader name={STRINGS.pageTitleAttachedFile} />

      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <Skeleton show={handle.isLoading} colors={[COLORS.lightestGray, COLORS.lightGray]} colorMode="light">
            {handle.isSuccess && !handle.isLoading ? (
              ARRAY.documentFormat.includes(parsed[0].path.split('.').pop()!) ? (
                <MaterialIconsNote icon="file-document-multiple" text={STRINGS.documentNote} />
              ) : (
                <React.Fragment>
                  <View style={styles.imageView}>
                    <Image source={{ uri: file }} style={styles.image} transition={300} contentFit="contain" />
                  </View>

                  <View style={styles.rowView}>
                    <View style={styles.textView}>
                      <Text style={styles.boldText}>{STRINGS.cllnName}</Text>

                      <Text style={styles.regularText}>{parsed[0].name || STRINGS.blank}</Text>
                    </View>
                  </View>
                </React.Fragment>
              )
            ) : (
              <MaterialIconsNote icon="file-remove" text={STRINGS.lostFileAttachment} />
            )}
          </Skeleton>

          {handle.isSuccess && (
            <TouchableOpacity onPress={onHandleDownload} style={styles.button}>
              <Text style={styles.buttonText}>{STRINGS.download}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default AttachedFile;
