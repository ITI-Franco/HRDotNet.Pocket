/**
 * @project      HRDotNet-Mobile
 * @description  Main Component for Pending
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */
//--- React Modules
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
//--- Expo Modules
import { FontAwesome5 } from '@expo/vector-icons';
//--- Other Modules
import PageHeader from 'src/components/header/PageHeader';
import Line from 'src/components/use/Line';
import Loader from 'src/components/loader/Loader';
//--- HRDotNet Components
import { COLORS, STRINGS, DateTimeUtils } from 'src';
import { APIMethods, ContentTypes } from 'src/constants/Values';
import { PayslipDetailsItems } from 'src/types/Profile';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import {
  ColTextView,
  HeaderRowBetweenFor2,
  HeaderRowBetweenFor3,
  NormalRowBetweenFor2,
  NormalRowBetweenFor3,
  RowTextView,
  textStyles,
} from 'src/components/use/usePayslip';
import { PAYSLIP } from 'src/constants/styles/Payslip';
import { generatePayslip } from 'src/constants/pdf/generatePayslip';
import { Shadow } from 'react-native-shadow-2';

interface Params {
  id: number;
}

const PayslipDetails: React.FC = () => {
  const styles = PAYSLIP.PayslipDetails;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [details, setDetails] = React.useState<PayslipDetailsItems>();
  const route = useRoute<RouteProp<{ params: Params }, 'params'>>();
  const { id } = route.params;

  React.useEffect(() => {
    (async () => {
      try {
        const response = await UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_PAYROLL_PAYSLIP}/${id}/details`,
        );
        setDetails(response.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <PageHeader name={STRINGS.pageTitlePayslip} />

      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView indicatorStyle="white">
          <View style={styles.mainContainer}>
            {details?.employees.map((employee) => {
              const totalRegularHours = employee.timekeepingDetails.reduce(
                (acc, tk) => acc + tk.dayType.hourType.regular,
                0,
              );

              const totalOvertimeHours = employee.timekeepingDetails.reduce(
                (acc, tk) => acc + tk.dayType.hourType.overtime,
                0,
              );

              const totalLoans = employee.payrollDetails
                .filter((pd) => pd.payrollItem.code.startsWith('LN') && !pd.payrollItem.code.startsWith('-LN-'))
                .reduce((acc, pd) => acc + pd.amount, 0);

              const totalAllowances = employee.payrollDetails
                .filter((pd) => pd.payrollItem.code.includes('AL-') && !pd.payrollItem.code.includes('-AL-'))
                .reduce((acc, pd) => acc + pd.amount, 0);

              const totalND = employee.timekeepingDetails.reduce(
                (acc, tk) => acc + tk.dayType.hourType.nightDifferential,
                0,
              );
              const totalNDOT = employee.timekeepingDetails.reduce(
                (acc, tk) => acc + tk.dayType.hourType.nightDifferentialOvertime,
                0,
              );

              const totalLeave = employee.timekeepingDetails.reduce((acc, tk) => acc + tk.leave.count, 0);

              const totalEarning = employee.otherEarnings + employee.overtime + employee.basicPay;
              const totalDeductions =
                totalLoans +
                employee.ssses +
                employee.phicee +
                employee.hdmfee +
                employee.absence +
                employee.tardy +
                employee.tax +
                employee.undertime;

              const timekeepingDetails = employee.timekeepingDetails.sort(
                (a, b) => new Date(a.workDate).getTime() - new Date(b.workDate).getTime(),
              );
              
              const totalBasicPay = totalRegularHours + totalOvertimeHours

              return (
                <>
                  <Shadow
                    distance={3}
                    offset={[1.5, 1.5]}
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 20,
                      paddingVertical: 30,
                      borderRadius: 20,
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    {/* Main Details */}
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Inter_500Medium' }}>NET PAY</Text>
                      <Text style={{ textAlign: 'center', fontSize: 32, fontFamily: 'Inter_600SemiBold' }}>
                        ₱{employee.netPay.toLocaleString()}
                      </Text>
                      <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Inter_500Medium' }}>
                        PAY OUT DATE{' '}
                        {DateTimeUtils.dateDefaultToWord(`${details?.timekeeping.cutOff.datePayoutSchedule}`)}
                      </Text>
                      <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Inter_500Medium' }}>
                        CUTOFF PERIOD{' '}
                        {DateTimeUtils.twoDateRangeFormat(
                          `${details?.timekeeping.cutOff.dateRange.dateFrom}`,
                          `${details?.timekeeping.cutOff.dateRange.dateTime}`,
                        )}
                      </Text>
                      <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 20,
                            justifyContent: 'center',
                            paddingVertical: 8,
                            paddingHorizontal: 25,
                            backgroundColor: '#DFF2EB',
                            width: 'auto',
                          }}
                          onPress={() => generatePayslip({ details })}
                        >
                          <FontAwesome5
                            name="file-download"
                            size={18}
                            color={COLORS.darkBlue}
                            style={{ marginRight: 10 }}
                          />
                          <Text style={{ fontFamily: 'Inter_600SemiBold', color: COLORS.darkBlue }}>Payslip</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Earnings */}
                    <View style={{ marginTop: 40 }}>
                      <Text style={styles.earningsText}>Earnings</Text>
                      <View> 
                        <HeaderRowBetweenFor3 title=" " textOne="Hours/Minutes" textTwo="Total" />
                        <HeaderRowBetweenFor3
                          title="Basic Pay"
                          textOne={totalBasicPay.toLocaleString()}
                          textTwo={employee.basicPay.toLocaleString()}
                        />
                        <NormalRowBetweenFor2 label="Overtime Pay" total={employee.overtime.toLocaleString()} />
                        <NormalRowBetweenFor2 label="Other Earning" total={employee.otherEarnings.toLocaleString()} />
                      </View>
                      <Line opacity={0.3} />
                      <HeaderRowBetweenFor2 label="Total Earnings" total={totalEarning.toLocaleString()} />
                      <Line opacity={0.3} />
                    </View>

                    {/* Deductions */}
                    <View style={{ marginTop: 20 }}>
                      <Text style={styles.deductionsText}>Deductions</Text>
                      <View>
                        <NormalRowBetweenFor3 title="SSS" textTwo={employee.ssses.toLocaleString()} />
                        <NormalRowBetweenFor3 title="PHIL-HEALTH" textTwo={employee.phicee.toLocaleString()} />
                        <NormalRowBetweenFor3 title="HDMF" textTwo={employee.hdmfee.toLocaleString()} />
                        <NormalRowBetweenFor3 title="Loans" textTwo={totalLoans.toLocaleString()} />
                        <NormalRowBetweenFor3 title="Absences" textTwo={employee.absence.toLocaleString()} />
                        <NormalRowBetweenFor3 title="Tardy" textTwo={employee.tardy.toLocaleString()} />
                        <NormalRowBetweenFor3 title="Undertime" textTwo={employee.tardy.toLocaleString()} />
                        <NormalRowBetweenFor3
                          title="Other Deduction"
                          textTwo={employee.otherDeduction.toLocaleString()}
                        />
                      </View>
                      <Line opacity={0.3} />
                      <HeaderRowBetweenFor2 label="Total Deductions" total={totalDeductions.toLocaleString()} />
                      <Line opacity={0.3} />
                    </View>

                    {/* Net Pay View */}
                    <View style={styles.netPayView}>
                      <Text style={styles.netPayText}>Net Pay (PHP)</Text>

                      <Text style={[textStyles('reg', false), { fontSize: 17 }]}>
                        {employee.netPay.toLocaleString()}
                      </Text>
                    </View>

                    <Line width={5} opacity={0.3} />
                    <Line space={10} opacity={0.3} />

                    {/* Timekeeping */}
                    <View style={styles.timekeepingHeader}>
                      <Text style={styles.timekeepingText}>Timekeeping</Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                      <ColTextView
                        semiText="Cut Off Period"
                        regularText={DateTimeUtils.twoDateRangeFormat(
                          `${details?.timekeeping.cutOff.dateRange.dateFrom}`,
                          `${details?.timekeeping.cutOff.dateRange.dateTime}`,
                        )}
                      />

                      <Line space={5} />
                      <Line space={2} />
                    </View>

                    {/* Mapping Timekeeping Detail */}
                    {timekeepingDetails.map((tk) => {
                      const workDate = tk.workDate.split('T')[0];
                      const day = workDate.slice(-2);
                      return (
                        <View style={{ height: 'auto' }}>
                          <Shadow
                            distance={3}
                            offset={[1.5, 1.5]}
                            style={{
                              backgroundColor: 'white',
                              paddingHorizontal: 10,
                              borderRadius: 10,
                              width: '100%',
                              marginBottom: 10,
                              borderLeftWidth: 10,
                              borderLeftColor: COLORS.powderBlue,
                            }}
                            key={DateTimeUtils.dateDashToDefault(tk.workDate)}
                          >
                            <View style={{ paddingVertical: 10 }}>
                              {tk.dayType.type === 'Regular Day' ? (
                                <>
                                  <Text style={{ fontWeight: 800, fontSize: 18 }}>
                                    {DateTimeUtils.dateDefaultToFullWord(tk.workDate)}
                                  </Text>
                                  <View>
                                    <RowTextView
                                      semiText="Schedule: "
                                      regularText={`${tk.schedule.name.split('(')[0]}`}
                                    />
                                  </View>
                                  <View style={{ paddingLeft: 20 }}>
                                    <RowTextView semiText="Day Type: " regularText={tk.dayType.type} />
                                    {tk.actualTimeIn === 'No Log' && tk.actualTimeOut === 'No Log' ? (
                                      <RowTextView semiText="Leave: " regularText="On Leave" />
                                    ) : (
                                      <>
                                        <RowTextView
                                          semiText="Time In: "
                                          regularText={
                                            tk.actualTimeIn === 'No Log'
                                              ? null
                                              : (DateTimeUtils.timeSecondsToUnits(tk.actualTimeIn) as any)
                                          }
                                        />
                                        <RowTextView
                                          semiText="Time Out: "
                                          regularText={
                                            tk.actualTimeIn === 'No Log'
                                              ? null
                                              : (DateTimeUtils.timeSecondsToUnits(tk.actualTimeOut) as any)
                                          }
                                        />
                                      </>
                                    )}
                                  </View>
                                </>
                              ) : (
                                <>
                                  <Text style={{ fontWeight: 800, fontSize: 18 }}>
                                    {DateTimeUtils.dateDefaultToFullWord(tk.workDate)}
                                  </Text>
                                  <View>
                                    <RowTextView
                                      semiText="Schedule: "
                                      regularText={`${tk.schedule.name.split('(')[0]}`}
                                    />
                                  </View>
                                  <View style={{ paddingLeft: 20 }}>
                                    <RowTextView semiText="Day Type: " regularText={tk.dayType.type} />
                                  </View>
                                </>
                              )}
                            </View>
                          </Shadow>
                        </View>
                      );
                    })}

                    {/* Totals  */}
                    <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                      <Text style={{ fontWeight: 800, fontSize: 22 }}>Total </Text>
                      <RowTextView
                        semiText="Regular (Hours): "
                        regularText={`${totalRegularHours.toLocaleString()} Hours`}
                      />
                      <RowTextView semiText="Absent: " regularText={`${employee.absence.toLocaleString()} Days`} />
                      <RowTextView
                        semiText="Undertime: "
                        regularText={`${employee.undertime.toLocaleString()} Minutes`}
                      />
                      <RowTextView semiText="Tardy: " regularText={`${employee.tardy.toLocaleString()} Minutes`} />
                      <RowTextView
                        semiText="ND/NDOT: "
                        regularText={`${totalNDOT.toLocaleString()} Hours /${totalND.toLocaleString()} Hours`}
                      />
                      <RowTextView semiText="Overtime: " regularText={`${totalOvertimeHours.toLocaleString()} Hours`} />
                      <RowTextView semiText="Leave: " regularText={`${totalLeave.toLocaleString()} Days`} />
                    </View>
                  </Shadow>
                </>
              );
            })}
          </View>
        </ScrollView>
      )}
    </React.Fragment>
  );
};

export default PayslipDetails;
