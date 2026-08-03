import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { STYLES, DateTimeUtils } from 'src';

const TimeDisplay = ()=> {
  const styles = STYLES.ClockInOut
 const [time, setTime] = useState(DateTimeUtils.getCurrTimeWithSecondsUnits());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTimeUtils.getCurrTimeWithSecondsUnits());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <Text style={styles.timeText}>{time}</Text>;
}


export default TimeDisplay;