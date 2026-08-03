/**
 * @project      HRDotNet-Mobile
 * @description  Use Loan Fetch for the Loan Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */

import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';
import { LoanLedgerInterface } from 'src/types/LoanLedger';

export const LOAN_LEDGER = {
  Main: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
      height: '100%',
    },

    wrapper: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    innerWrapper: {
      marginHorizontal: 20,
    },
  }),

  LoanItem: (items: LoanLedgerInterface) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
      },
      itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginTop: 25,
        borderRadius: 40,
      },

      itemWrapper: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
      },

      dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor:
          items.filing.filingStatus.name == 'Approved'
            ? COLORS.green
            : items.filing.filingStatus.name == 'Reviewed'
              ? COLORS.purple
              : items.filing.filingStatus.name == 'Filed'
                ? COLORS.lightPurple
                : items.filing.filingStatus.name == 'Cancelled'
                  ? COLORS.red
                  : COLORS.darkGray,
        paddingHorizontal: 20,
      },

      rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
      },

      currDateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
        maxWidth: '50%'
      },

      statusText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
      },

      bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
      },

      reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      boldText: {
        fontFamily: 'Inter_600SemiBold',
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
      },

      moreText: {
        fontSize: 13,
        paddingBottom: 2,
      },

      moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),

  LoanDetails: (status: string | undefined) =>
    StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
      },

      viewContainer: {
        marginHorizontal: 30,
        marginVertical: 20,
      },

      container: {
        opacity: 1,
        flex: 1,
        backgroundColor: COLORS.clearWhite,
      },

      backButton: {
        paddingHorizontal: 10,
      },

      textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
      },

      topContent: {
        backgroundColor:
          status == 'Filed'
            ? COLORS.lightPurple
            : status == 'Reviewed'
              ? COLORS.purple
              : status == 'Approved'
                ? COLORS.green
                : status == 'Cancelled'
                  ? COLORS.red
                  : COLORS.darkGray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
      },

      topText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
      },

      content: {
        padding: 20,
        width: '100%',
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite,
      },

      rowWrapper: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent:'space-between'
      },

      titleText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
        // fontSize: 12
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
        // fontSize: 12
      },

      statusWrapper: {
        width: '80%',
      },

      detailsTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        marginHorizontal: 30,
      },

      detailView: {
        borderRadius: 20,
        margin: 10,
      },

      shadowView: {
        backgroundColor: COLORS.clearWhite,
        width: '100%',
        borderRadius: 20,
      },

      topDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lighterGray,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },

      bodyDetail: {
        paddingVertical: 5,
        paddingHorizontal: 20,
      },

      topLeftDetail: { alignItems: 'center' },

      boldText: { fontFamily: 'Inter_600SemiBold' },

      bodyText: { fontFamily: 'Inter_500Medium' },
    }),
};
