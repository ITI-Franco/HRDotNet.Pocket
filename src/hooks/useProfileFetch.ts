/**
 * @project      HRDotNet-Mobile
 * @description  Profile Fetching contains the Fetching of API for Personal and Payslip Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @date_updated
 */

import { APIMethods, ContentTypes } from 'src/constants/Values';
import { PayslipData, PayslipDetailsItems, PaySlipStates, ProfileHandle } from 'src/types/Profile';
import { UtilsFetch } from 'src/utils/UtilsFetch';

export const useProfileFetch = {
  Personal: async () => {},

  Payslip: async (
    setPayslip: React.Dispatch<Partial<PaySlipStates>>,
    setHandle: React.Dispatch<Partial<ProfileHandle>>,
  ) => {
    setHandle({
      isLoadingPayslip: true,
    });

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PAYROLL_PAYSLIP}`)
      .then((response: { data: PayslipData }) => {
        const totalEarnings = response.data.items.reduce((acc, item) => {
          return (
            acc +
            item.employees.reduce((empAcc, emp) => {
              const totalAllowances =
                emp.payrollDetails
                  ?.filter((pd) => pd.payrollItem.code.startsWith('AL'))
                  .reduce((acc, pd) => acc + pd.amount, 0) ?? 0;

              const totalOvertime =
                emp.payrollDetails
                  ?.filter((pd) => pd.payrollItem.code === 'OT')
                  .reduce((acc, pd) => acc + pd.amount, 0) ?? 0;

              const totalEarning = totalAllowances + totalOvertime + emp.basicPay;
              return empAcc + totalEarning;
            }, 0)
          );
        }, 0);
        setPayslip({
          data: response.data,
          page: response.data.page,
          totalEarning: totalEarnings,
        });
        setHandle({
          isLoadingPayslip: false,
        });
      })
      .catch(async (error: TypeError) => {
        console.error(error);
      })
      .finally(() => {
        setHandle({
          isLoadingPayslip: false,
          isLoadMoreHistory: false,
        });
      });
  },

  PayslipDetails: async (
    summaryId: number,
    setPayslip: React.Dispatch<Partial<PaySlipStates>>,
    setHandle: React.Dispatch<Partial<ProfileHandle>>,
  ) => {
    setHandle({
      isLoadingPayslipDetails: true,
    });
    await UtilsFetch.connect(
      APIMethods.GET,
      ContentTypes.JSON,
      `${process.env.EXPO_PUBLIC_PAYROLL_PAYSLIP}/${summaryId}/details`,
    )
      .then((response: { data: PayslipDetailsItems }) => {
        const sss = response.data.employees.map((emp) => {
          emp.payrollDetails.filter((pd) => pd.payrollItem.code === 'SSSES').reduce((acc, pd) => acc + pd.amount, 0);
        });

        const philHealth = response.data.employees.map((emp) => {
          emp.payrollDetails.filter((pd) => pd.payrollItem.code === 'PHES').reduce((acc, pd) => acc + pd.amount, 0);
        });

        setPayslip({
          item: response.data,
          sss: sss.toLocaleString(),
          philHealth: philHealth.toLocaleString(),
        });
      })
      .catch((error: TypeError) => {
        console.error(error);
      })
      .finally(() => {
        setHandle({
          isLoadingPayslipDetails: false,
          isLoadMoreHistory: false,
        });
      });
  },
};
