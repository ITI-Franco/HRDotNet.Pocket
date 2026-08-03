// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import React from 'react';
import { Text, View } from 'react-native';
import { STYLES } from 'src/constants/styles/Styles';
import { PendingApplication } from 'src/types/Pending';
import { UtilsFetch } from 'src/utils/UtilsFetch';

interface BadgeProps {
  url: string;
  value?: 'Filed' | 'Reviewed' | '';
  filterKey?: string;
}
const UseBadge: React.FC<BadgeProps> = ({ url, value }) => {
  const [count, setCount] = React.useState('');
  const styles = STYLES.ComponentMenuButton;
  const [filteredData, setFilteredData] = React.useState<PendingApplication[]>([]);

  React.useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const response = await UtilsFetch.connect('GET', 'application/json', `${url}`);
        const fetchedCount = response.data.totalCount;
        let data = response.data.pendingApplications;

        if (value) {
          data = data.filter((application: PendingApplication) => {
            if (value === 'Filed') {
              return application.filingStatus.name === 'Filed';
            } else if (value === 'Reviewed') {
              return application.filingStatus.name === 'Reviewed';
            }
            return application.filingStatus.name === '';
          });
        }

        setFilteredData(data);
        setCount(fetchedCount);
      } catch (error) {}
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.badge}>
      {value ? (
        <Text style={styles.badgeText}>{filteredData.length === 0 ? '' : filteredData.length}</Text>
      ) : (
        <Text style={styles.badgeText}>{count === '' ? '' : count}</Text>
      )}
    </View>
  );
};

export default UseBadge;
