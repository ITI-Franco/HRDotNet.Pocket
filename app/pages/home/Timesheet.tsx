// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';

import PageHeader from 'src/components/header/PageHeader';
import Loader from 'src/components/loader/Loader';
import Note from 'src/components/note/Note';
import Toast from 'src/components/use/Toast';
import TimesheetItem from 'src/components/item/TimesheetItem';
import { COLORS, STYLES, STRINGS, DateTimeUtils } from 'src';
import { useTimesheet } from 'src/contexts/pages';

enum Source {
  OB = 'Official Business',
  ML = 'Missed Log',
  ETR = 'Employee Time Record',
}

const Timesheet: React.FC = () => {
  const styles = STYLES.Timesheet;

  const getSourceVal = (value: string) => {
    if (value in Source) {
      return Source[value as keyof typeof Source];
    }
    return value;
  };

  const {
    state,
    handle,
    setHandle,

    onHandlePress,
    onHandleEffectI,
  } = useTimesheet();

  useEffect(() => {
    onHandleEffectI();
  }, [state.calendarDate]);

  return (
    <React.Fragment>
      <PageHeader name={STRINGS.pageTitleTimesheet} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <View style={styles.container}>
        {handle.isLoading && <Loader />}

        <React.Fragment>
          <View style={styles.agendaCalendar}>
            <Text style={styles.textHeader}>{DateTimeUtils.dateDefaultToWordMonthYear(state.calendarDate)}</Text>

            <Agenda
              onDayPress={(day: { dateString: string }) => onHandlePress(day)}
              renderToHardwareTextureAndroid
              shouldRasterizeIOS
              showClosingKnob
              showOnlySelectedDayItems
              firstDay={1}
              selected={DateTimeUtils.dateDefaultToDash(state.calendarDate)}
              renderList={() => (
                <React.Fragment>
                  {!state.calendarDate ? (
                    <Note text={STRINGS.selectDateNote} icon="grid" size={90} />
                  ) : state.clockIn.date || state.clockOut.date ? (
                    <React.Fragment>
                      <TimesheetItem
                        title={STRINGS.clockIn}
                        time={state.clockIn?.date!}
                        source={getSourceVal(state.clockIn.source)}
                        color={COLORS.orange}
                        icon="sign-in"
                      />

                      <TimesheetItem
                        title={STRINGS.clockOut}
                        time={state.clockOut?.date!}
                        source={getSourceVal(state.clockOut.source)}
                        color={COLORS.powderBlue}
                        icon="sign-out"
                      />
                    </React.Fragment>
                  ) : (
                    <Note text={STRINGS.noLogs} icon="notifications-off" size={50} />
                  )}
                </React.Fragment>
              )}
            />
          </View>
        </React.Fragment>
      </View>
    </React.Fragment>
  );
};

export default Timesheet;
