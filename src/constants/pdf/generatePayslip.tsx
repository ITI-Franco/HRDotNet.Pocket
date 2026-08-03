/**
 * @project      HRDotNet-Mobile
 * @description  GeneratePaysliPDF
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @modified     10-11-2024
 */
//--- Expo Modules
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
//--- Other Modules
import { PayslipDetailsItems } from 'src/types/Profile';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { generatePDF } from 'src/components/use/usePDF';
import { ASSETS } from 'src';

export const generatePayslip = async ({ details }: { details: PayslipDetailsItems }) => {
  const payslipContent = generatePDF({
    children: ` ${details.employees.map((emp) => {
      const totalRegularHours = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.dayType.hourType.regular, 0);

      const totalOvertimeHours = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.dayType.hourType.overtime, 0);
      const totalND = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.dayType.hourType.nightDifferential, 0);
      const totalNDOT = emp.timekeepingDetails.reduce(
        (acc, tk) => acc + tk.dayType.hourType.nightDifferentialOvertime,
        0,
      );
      const totalAbsences = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.deduction.absences, 0);
      const totalTardy = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.deduction.tardy, 0);
      const totalUndertime = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.deduction.undertime, 0);
      const totalLeave = emp.timekeepingDetails.reduce((acc, tk) => acc + tk.leave.count, 0);

      //   const totalAbsences = tk.deduction.absences;

      const totalLoans = emp.payrollDetails
        .filter((pd) => pd.payrollItem.code.startsWith('LN'))
        .reduce((acc, pd) => acc + pd.amount, 0);

      const totalAllowances = emp.payrollDetails
        .filter((pd) => pd.payrollItem.code.startsWith('AL'))
        .reduce((acc, pd) => acc + pd.amount, 0);

      const totalOvertime = emp.payrollDetails
        .filter((pd) => pd.payrollItem.code === 'OT')
        .reduce((acc, pd) => acc + pd.amount, 0);

      const sss = emp.payrollDetails
        .filter((pd) => pd.payrollItem.code === 'SSSES')
        .reduce((acc, pd) => acc + pd.amount, 0);

      const philHealth = emp.payrollDetails
        .filter((pd) => pd.payrollItem.code === 'PHES')
        .reduce((acc, pd) => acc + pd.amount, 0);
      const totalEarning = totalAllowances + totalOvertime + emp.basicPay;
      const totalDeductions = totalLoans + sss + philHealth + emp.absence + emp.tardy + emp.tax;

      const timekeepingDetails = emp.timekeepingDetails.sort(
        (a, b) => new Date(a.workDate).getTime() - new Date(b.workDate).getTime(),
      );

      return `  <div
        style="
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        "
        >
        <div style="font-weight: 800; font-size: 18px">
            <div style="font-size: 25px">Intellismart Technology Incorporated</div>
            <div>12 Catanduanes, Quezon City, 1105 Metro Manila</div>
            <div>Phone: (02) 8355 4663</div>
            <div>Email: marketing@intellismartinc.com</div>
        </div>
        <div
            style="
            border: 2px solid black;
            width: 100px;
            height: 100px;
            justify-content: center;
            display: flex;
            align-items: center;
            background-color: lightblue;
            "
        >
           <img src="${ASSETS.logoIcon}" alt="Logo" style="max-width: 100%; max-height: 100%;" />
        </div>
        </div>
        <!-- Header Information End -->

        <!-- Header Payslip Start -->
        <div
        style="
            width: auto;
            border: 2px solid black;
            margin-top: 20px;
            text-align: center;
            font-weight: 700;
            font-size: 24px;
        "
        >
        Payslip for ${DateTimeUtils.dateDefaultToWord(details.timekeeping.cutOff.datePayoutSchedule)}
        </div>
        <!-- Header Payslip End -->

        <!-- Container Start -->
        <div
        style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: auto;
            padding: 20px 0px 20px 0px;
        "
        >
        <div style="width: 50%">
            <div style="width: auto">
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Employee Name:</label>
                <div>${emp.name}</div>
            </div>
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Role:</label>
                <div>${emp.positionLevel.name}</div>
            </div>
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Employee Code: </label>
                <div>${emp.code}</div>
            </div>
            </div>
        </div>
        <div style="width: 50%">
            <div style="width: auto">
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Cutoff Date:</label>
                <div>${DateTimeUtils.twoDateRangeFormat(
                  `${details?.timekeeping.cutOff.dateRange.dateFrom}`,
                  `${details?.timekeeping.cutOff.dateRange.dateTime}`,
                )}</div>
            </div>
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Document No:</label>
                <div>${details.timekeeping.documentNo}</div>
            </div>
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <label style="font-weight: 700">Date Generated:</label>
                <div>${DateTimeUtils.dateDefaultToWord(details.dateGenerated)}</div>
            </div>
            <div
                style="
                display: flex;
                width: auto;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 18px;
                "
            >
                <div style="font-weight: 700">Salary per Month:</div>
                <div style="text-align: start">${emp.netPay}</div>
            </div>
            </div>
        </div>
        </div>
        <!-- Container End -->

        <!-- Earning And Deduction Container Start -->
        <div
        style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: auto;
            padding: 20px 0px 20px 0px;
        "
        >
        <div style="width: 45%">
            <!-- Header Earnings -->
            <div
            style="
                width: auto;
                border: 2px solid black;
                text-align: center;
                font-weight: 700;
                font-size: 20px;
            "
            >
            Earnings
            </div>
            <!-- List of Earnings -->
            <div style="width: auto">
            <div style="width: auto">
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Basic Pay:</label>
                <div>${emp.basicPay}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Overtime Pay:</label>
                <div>${totalOvertime.toLocaleString()}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Other Earning:</label>
                <div>${emp.otherEarnings.toLocaleString()}</div>
                </div>

                <!-- Line Start -->
                <div
                style="
                    background-color: gray;
                    width: 100%;
                    height: 3px;
                    margin: 10px 0px 10px 0px;
                "
                ></div>
                <!-- Line End -->

                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 20px;
                "
                >
                <label style="font-weight: 700">Total Earnings:</label>
                <div style="font-weight: 700">${totalEarning.toLocaleString()}</div>
                </div>
            </div>
            </div>
        </div>
        <div style="width: 45%">
            <!-- Header Deductions -->
            <div
            style="
                width: auto;
                border: 2px solid black;
                text-align: center;
                font-weight: 700;
                font-size: 20px;
            "
            >
            Deductions
            </div>
            <!-- List of Deductions -->
            <div style="width: auto">
            <div style="width: auto">
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">SSS:</label>
                <div>${sss.toLocaleString()}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">PHIL-HEALTH:</label>
                <div>${philHealth.toLocaleString()}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Loans:</label>
                <div>${totalLoans.toLocaleString()}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Absences:</label>
                <div>${emp.absence}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Tardy:</label>
                <div>${emp.tardy}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Undertime:</label>
                <div>${emp.undertime}</div>
                </div>
                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 18px;
                "
                >
                <label style="font-weight: 700">Other Deductions:</label>
                <div>${emp.otherDeduction}</div>
                </div>
                <!-- Line Start -->
                <div
                style="
                    background-color: gray;
                    width: 100%;
                    height: 3px;
                    margin: 10px 0px 10px 0px;
                "
                ></div>
                <!-- Line End -->

                <div
                style="
                    display: flex;
                    width: auto;
                    justify-content: space-between;
                    padding-left: 20px;
                    padding-right: 20px;
                    font-size: 20px;
                "
                >
                <label style="font-weight: 700">Total Deductions:</label>
                <div style="font-weight: 700">${totalDeductions.toLocaleString()}</div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- Earning And Deduction Container End -->

        <!-- Total Net Pay Start -->
        <div
        style="
            width: auto;
            border: 2px solid black;
            margin-top: 20px;
            text-align: center;
            font-weight: 700;
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            padding: 8px;
        "
        >
        <div>Total Earnings: ${totalEarning.toLocaleString()}</div>
        <div>Total Deductions: ${totalDeductions.toLocaleString()}</div>
        <div>Net Pay (PHP): ${emp.netPay.toLocaleString()}</div>
        </div>
        <!-- Total Net Pay Start -->

        <!-- Timekeeping table start -->
        <div style="background-color: white; width: auto; margin-top: 40px">
            <label style="font-weight: 800; font-size: 22px; padding-left: 20px"
                >Timekeeping</label
            >
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px">
                <thead>
                    <tr
                        style="
                        background-color: white;
                        font-weight: 800;
                        border: 2px solid black;
                        "
                    >
                        <th style="padding: 5px 10px">Date</th>
                        <th style="padding: 5px 10px">Biometrics In</th>
                        <th style="padding: 5px 10px">Biometrics Out</th>
                        <th style="padding: 5px 10px">Day Type</th>
                        <th style="padding: 5px 10px">Schedule</th>
                        <th style="padding: 5px 10px">Absent (Days)</th>
                        <th style="padding: 5px 10px">Undertime (Minutes)</th>
                        <th style="padding: 5px 10px">Tardy (Minutes)</th>
                        <th style="padding: 5px 10px">Reg (Hours)</th>
                        <th style="padding: 5px 10px">Overtime (Hours)</th>
                        <th style="padding: 5px 10px">ND (Hours)</th>
                        <th style="padding: 5px 10px">NDOT (Hours)</th>
                        <th style="padding: 5px 10px">Leave (Days)</th>
                    </tr>
                </thead>
                <tbody>
                ${timekeepingDetails.map((tk, index) => {
                  return `
                    <tr style="font-weight: 800; background-color: white" key={${index}}>
                        <td style="padding: 5px 10px; text-align: center">${DateTimeUtils.dateDefaultToFullWord(tk.workDate)}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.actualTimeIn}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.actualTimeOut}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.dayType.type}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.schedule.name.split('(')[0]}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.deduction.absences}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.deduction.undertime}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.deduction.tardy}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.dayType.hourType.regular}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.dayType.hourType.overtime}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.dayType.hourType.nightDifferential}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.dayType.hourType.nightDifferentialOvertime}</td>
                        <td style="padding: 5px 10px; text-align: center">${tk.leave.count}</td>
                    </tr>
                `;
                })}
                <tr style="font-weight: 800; background-color: white; border: 1px solid black">

                    <td style="padding: 5px 10px; text-align: center; font-size: 20px; font-weight: 800">Total</td>
                    <td style="padding: 5px 10px; text-align: center"></td>
                    <td style="padding: 5px 10px; text-align: center"></td>
                    <td style="padding: 5px 10px; text-align: center"></td>
                    <td style="padding: 5px 10px; text-align: center"></td>
                    <td style="padding: 5px 10px; text-align: center">${totalAbsences}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalUndertime}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalTardy}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalRegularHours}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalOvertimeHours}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalND}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalNDOT}</td>
                    <td style="padding: 5px 10px; text-align: center">${totalLeave}</td>
                </tr>
                </tbody>
            </table>
        </div>`;
    })}`,
  });

  const { uri } = await Print.printToFileAsync({ html: payslipContent });

  if (uri) {
    const name = `${DateTimeUtils.dateDefaultToWord(details.timekeeping.cutOff.datePayoutSchedule)}` + '-Payslip.pdf';
    const destination = `${FileSystem.documentDirectory}${name}`;
    try {
      await FileSystem.moveAsync({ from: uri, to: destination });
    } catch (error) {
      console.error('Error saving file:', error);
    }

    try {
      await Sharing.shareAsync(destination);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  }
};
