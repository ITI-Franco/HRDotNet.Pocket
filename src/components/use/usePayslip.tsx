import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { STYLES } from 'src/constants/styles/Styles';

const styles = STYLES.MorePayslip;

export const textStyles = (val: string, bold?: boolean, width?: boolean) => {
  return val == 'semi'
    ? STYLES.MorePayslipSemiText(bold, width)
    : val == 'reg'
      ? STYLES.MorePayslipRegularText(bold, width)
      : null;
};

export const NormalRowBetweenFor3 = React.memo(
  ({ title, textOne, textTwo }: { title: string; textOne?: string | number; textTwo: string }) => {
    return (
      <View style={styles.regularDayView}>
        <Text style={textStyles('semi', false, true)}>{title}</Text>

        {textOne && <Text style={[textStyles('reg', false), { marginLeft: -40 }]}>{textOne}</Text>}

        <Text style={textStyles('reg', false)}>{textTwo}</Text>
      </View>
    );
  },
);

export const HeaderRowBetweenFor3 = React.memo(
  ({ title, textOne, textTwo }: { title: string; textOne?: string | number; textTwo: string }) => {
    return (
      <View style={styles.regularDayView}>
        <Text style={[textStyles('semi', false, true), { fontWeight: 800 }]}>{title}</Text>


        {textOne && <Text style={[textStyles('reg', false), { marginLeft: -40, fontWeight: 800 }]}>{String(textOne)}</Text>}

        <Text style={[textStyles('reg', false), { fontWeight: 800 }]}>{textTwo}</Text>
      </View>
    );
  },
);

export const HeaderRowBetweenFor2 = React.memo(({ label, total }: { label: string; total: string }) => {
  return (
    <View style={styles.regularDayView}>
      <Text style={[textStyles('semi', false, true), { fontSize: 17, fontWeight: 900 }]}>{label}</Text>

      <Text style={[textStyles('reg', false), { fontSize: 17 }]}>{total}</Text>
    </View>
  );
});

export const NormalRowBetweenFor2 = React.memo(({ label, total }: { label: string; total: string }) => {
  return (
    <View style={styles.regularDayView}>
      <Text style={[textStyles('semi', false, true)]}>{label}</Text>

      <Text style={[textStyles('reg', false)]}>{total}</Text>
    </View>
  );
});

export const ColTextView = React.memo(({ semiText, regularText }: { semiText: string; regularText: string }) => {
  return (
    <React.Fragment>
      <View>
        <Text style={[textStyles('semi', false), { marginRight: 3, fontSize: 16 }]}>{semiText}</Text>
      </View>
      <View>
        <Text style={[textStyles('reg', false, true), { fontSize: 14 }]}>{regularText}</Text>
      </View>
    </React.Fragment>
  );
});

export const RowTextView = React.memo(({ semiText, regularText }: { semiText: string; regularText: string }) => {
  return (
    <React.Fragment>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[textStyles('semi', false), { marginRight: 3, fontSize: 16 }]}>{semiText}</Text>

        <Text style={[textStyles('reg', false, true), { fontSize: 14 }]}>{regularText}</Text>
      </View>
    </React.Fragment>
  );
});
