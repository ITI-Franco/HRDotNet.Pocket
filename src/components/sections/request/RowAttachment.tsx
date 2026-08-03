// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { Utils } from 'src/utils/Utils';
import { useRoute } from '@react-navigation/native';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';

import { STYLES, COLORS, STRINGS, ARRAY } from 'src';
import {
  PropsRowAttachment,
  SchemaFileAttachment,
  ParamsAttachedFile,
  ParamsRequestApplication,
} from 'src/types/Types';

const RowAttachment: React.FC<PropsRowAttachment> = ({ attachment }) => {
  const styles = STYLES.ComponentRequestSummary;

  const params = useRoute().params as ParamsRequestApplication;

  const [stateFormat, setStateFormat] = useState<string>('');
  const [stateUri, setStateUri] = useState<string>();

  useEffect(() => {
    (async () => {
      // ML Request Update Record
      const fileAttachment = params?.data as ParamsAttachedFile;
      const parsed: Array<SchemaFileAttachment> = !attachment?.url ? [{ path: '' }] : JSON.parse(attachment?.url);
      const format = Utils.checkExistFileAttach(
        attachment?.url!,
        await Utils.extractFileFormat(parsed[0].path),
      ) as string;
      const uri = Utils.checkExistFileAttach(
        attachment?.url!,
        await Utils.extractFileAttach(fileAttachment, parsed),
      ) as string;

      setStateFormat(format);
      setStateUri(uri);
    })();
  }, [stateFormat, stateUri]);

  return (
    <View style={styles.rowView}>
      <Text style={styles.boldText}>{STRINGS.fileAttachment}</Text>
      {attachment?.url === undefined || ''
        ? UtilsDisplay.DisplayDataImage(attachment?.format, attachment?.uri)
        : UtilsDisplay.DisplayDataImage(stateFormat, stateUri)}
      <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
    </View>
  );
};

export default RowAttachment;
