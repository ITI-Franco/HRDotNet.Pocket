import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

import {
  RndrApprovals,
  RndrCalendar,
  RndrCamera,
  RndrContacts,
  RndrHome,
  RndrLoanLedger,
  RndrLogin,
  RndrNotification,
  RndrPending,
  RndrProfile,
  RndrRequest,
  RndrReviewals,
  RndrTeamMember,
  RndrTimeOff,
  RndrTimesheet,
} from 'src/contexts';

import Drawer from './pages/home/Drawer';

import ClockInOut from './pages/home/ClockInOut';
import AboutUs from './pages/navigate/AboutUs';
import ApprovalDetails from './pages/navigate/ApprovalDetails';
import AttachedFile from './pages/navigate/AttachedFile';
import LoanDetails from './pages/navigate/LoanDetails';
import PayslipDetails from './pages/navigate/PayslipDetails';
import RequestDetails from './pages/navigate/RequestDetails';
import ReviewalDetails from './pages/navigate/ReviewalDetails';
import SelectionList from './pages/navigate/SelectionList';
import COSRequest from './pages/request/COSRequest';
import LVRequest from './pages/request/LVRequest';
import MLRequest from './pages/request/MLRequest';
import OBRequest from './pages/request/OBRequest';
import OFFRequest from './pages/request/OFFRequest';
import OTRequest from './pages/request/OTRequest';
import RequestSummary from './pages/request/RequestSummary';
import NotificationDetails from './pages/view/NotificationDetails';

import LoaderPage from 'src/components/loader/LoaderPage';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { COLORS, FONTS, STRINGS } from '../src';
import Forbidden from './pages/navigate/Forbidden';

const Index: React.FC = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [fontsLoaded] = FONTS();

  LogBox.ignoreAllLogs();

  useEffect(() => {
    UtilsFetch.interceptors();
  });

  if (!fontsLoaded) {
    return <LoaderPage />;
  }

  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          lazy: true,
          headerShown: false,
          tabBarIconStyle: {},
          tabBarStyle: {},
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'Inter_600SemiBold',
            marginTop: -2,
            marginBottom: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = focused
              ? 'plus-circle'
              : 'plus-circle-outline';

            if (route.name === 'Home') {
              iconName = focused ? 'home-variant' : 'home-variant-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar-month' : 'calendar-month-outline';
            } else if (route.name === 'Request') {
              iconName = focused ? 'folder-open' : 'folder-open-outline';
            } else if (route.name === 'Pending') {
              iconName = focused ? 'file-clock' : 'file-clock-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-circle' : 'account-circle-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.darkGray,
          unmountOnBlur: true,
        })}
        detachInactiveScreens
        initialRouteName={STRINGS.pathTabHome}
      >
        <Tab.Screen
          name={STRINGS.pathTabHome}
          component={RndrHome}
          options={{ headerLeft: () => null }}
          initialParams={{ refresh: true }}
        />

        <Tab.Screen name={STRINGS.pathTabCalendar} component={RndrCalendar} />
        <Tab.Screen name={STRINGS.pathTabRequest} component={RndrRequest} />
        <Tab.Screen name={STRINGS.pathPending} component={RndrPending} />
        <Tab.Screen name={STRINGS.pathTabProfile} component={RndrProfile} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationIndependentTree>
      <NavigationContainer
        children={
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              transitionSpec: {
                open: {
                  animation: 'spring',
                  config: {
                    stiffness: 600,
                    damping: 600,
                    mass: 4,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
                close: {
                  animation: 'spring',
                  config: {
                    stiffness: 600,
                    damping: 600,
                    mass: 4,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
              },
            }}
            initialRouteName={STRINGS.pathLogin}
          >
            <Stack.Screen key={STRINGS.pathLogin} name={STRINGS.pathLogin} component={RndrLogin} />
            <Stack.Screen key={STRINGS.pathTabStack} name={STRINGS.pathTabStack} component={TabStack} />
            <Stack.Screen key={STRINGS.pathForbidden} name={STRINGS.pathForbidden} component={Forbidden} />
            <Stack.Screen key={STRINGS.pathCOSRequest} name={STRINGS.pathCOSRequest} component={COSRequest} />
            <Stack.Screen key={STRINGS.pathOBRequest} name={STRINGS.pathOBRequest} component={OBRequest} />
            <Stack.Screen key={STRINGS.pathOTRequest} name={STRINGS.pathOTRequest} component={OTRequest} />
            <Stack.Screen key={STRINGS.pathOFFRequest} name={STRINGS.pathOFFRequest} component={OFFRequest} />
            <Stack.Screen key={STRINGS.pathLVRequest} name={STRINGS.pathLVRequest} component={LVRequest} />
            <Stack.Screen key={STRINGS.pathMLRequest} name={STRINGS.pathMLRequest} component={MLRequest} />
            {/* <Stack.Screen key={STRINGS.pathCTORequest} name={STRINGS.pathCTORequest} component={CTORequest} /> */}

            <Stack.Screen name={STRINGS.pathSelectionList} component={SelectionList} />
            <Stack.Screen name={STRINGS.pathRequestSummary} component={RequestSummary} />
            <Stack.Screen name={STRINGS.pathNotification} component={RndrNotification} />
            <Stack.Screen name={STRINGS.pathNotificationDetails} component={NotificationDetails} />
            <Stack.Screen name={STRINGS.pathPayslipDetails} component={PayslipDetails} />
            <Stack.Screen name={STRINGS.pathPending} component={RndrPending} />
            <Stack.Screen name={STRINGS.pathTimeOff} component={RndrTimeOff} />
            <Stack.Screen key={STRINGS.pathLoanLedger} name={STRINGS.pathLoanLedger} component={RndrLoanLedger} />
            <Stack.Screen name={STRINGS.pathLoanDetails} component={LoanDetails} />
            <Stack.Screen name={STRINGS.pathAboutUs} component={AboutUs} />
            <Stack.Screen name={STRINGS.pathTimesheet} component={RndrTimesheet} />
            <Stack.Screen name={STRINGS.pathClockInOut} component={ClockInOut} />
            <Stack.Screen name={STRINGS.pathApprovals} component={RndrApprovals} />
            <Stack.Screen name={STRINGS.pathReviewals} component={RndrReviewals} />
            {/* <Stack.Screen key={STRINGS.pathTeams} name={STRINGS.pathTeams} component={RndrTeams} /> */}
            <Stack.Screen key={STRINGS.pathContacts} name={STRINGS.pathContacts} component={RndrContacts} />
            <Stack.Screen key={STRINGS.pathTeams} name={STRINGS.pathTeamMembers} component={RndrTeamMember} />

            <Stack.Screen name={STRINGS.pathAttachedFile} component={AttachedFile} />
            <Stack.Screen name={STRINGS.pathRequestDetails} component={RequestDetails} />
            <Stack.Screen
              key={STRINGS.pathApprovalDetails}
              name={STRINGS.pathApprovalDetails}
              component={ApprovalDetails}
            />
            <Stack.Screen
              key={STRINGS.pathReviewalDetails}
              name={STRINGS.pathReviewalDetails}
              component={ReviewalDetails}
            />

            <Stack.Screen
              name={STRINGS.pathDrawer}
              component={Drawer}
              options={{
                gestureDirection: 'horizontal-inverted',
              }}
            />

            <Stack.Screen
              name={STRINGS.pathCamera}
              component={RndrCamera}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
              }}
            />
          </Stack.Navigator>
        }
      ></NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default Index;
