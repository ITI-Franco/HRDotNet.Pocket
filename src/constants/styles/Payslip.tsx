import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

export const PAYSLIP = {
  PayslipTimekeeping: StyleSheet.create({
    outerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
    },
    innerContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 20,
      width: '100%',
    },
    closeButtonContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 5,
    },
    tkHeaderContainer: {
      flexDirection: 'row',
      rowGap: 5,
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-start',
      paddingBottom: 3,
    },
    tkHeader: {
      fontWeight: 800,
      fontSize: 16,
    },
    tkBodyContainer: {
      flexDirection: 'row',
      rowGap: 5,
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-start',
      paddingBottom: 3,
    },
  }),

  PayslipDetails: StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 20, paddingVertical: 30, width: '100%', height: '100%' },
    detailsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    earningsText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      marginBottom: 10,
      width: '100%',
    },
    deductionsText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      marginBottom: 10,
      width: '100%',
    },
    netPayView: {
      marginTop: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      marginVertical: 3,
    },
    netPayText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      marginBottom: 10,
    },
    buttonView: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      paddingVertical: 10,
      backgroundColor: '#fae6d9',
      width: '40%',
    },
    // Timekeeping
    timekeepingHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    timekeepingText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 25,
    },
  }),
};
