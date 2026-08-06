// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageRequireSource, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, STRINGS, ASSETS } from 'src';
import { Utils } from 'src/utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { PropsMenuButton, StateMenuButton, TypeObjectValues } from 'src/types/Types';
import { useHome } from 'src/contexts/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const MenuButton: React.FC<PropsMenuButton> = ({ show }) => {
  const styles = STYLES.ComponentMenuButton;

  const navigation = useNavigation();
  const { state, checkTeamMembers } = useHome();

  const badge = (text: number) => {
    return (
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.badge}>
        <Text style={styles.badgeText}>{text}</Text>
      </Animatable.View>
    );
  };

  const onShowImage = (a: ImageRequireSource, b: ImageRequireSource) => {
    return show === 0 ? a : b;
  };
  const onShowTitle = (a: string, b: string) => {
    return show === 0 ? a : b;
  };

  const [approver, setApprover] = useState<boolean>(false);
  const [reviewer, setReviewer] = useState<boolean>(false);

  (async () => {
    try {
      const token = await AsyncStorage.getItem('AT');
      if (token) {
        const { CanApprove: approver, CanReview: reviewer } = jwtDecode<{ CanApprove: boolean; CanReview: boolean }>(
          token,
        );
        setApprover(approver);
        setReviewer(reviewer);
      } else {
        throw new Error('Token Not Found.');
      }
    } catch (err) {}
  })();

  // This hook is reponsible for checking if the user
  // have any team members.
  useEffect(() => {
    checkTeamMembers();
  }, [state.teamMembersCount]);

  const currState = {
    imageSize: Math.max(15, Dimensions.get('window').height / 15),
    padding: Dimensions.get('window').height * 0.015,
    firstRow: [
      {
        navigate: () => navigation.navigate(STRINGS.pathTimesheet as never),
        image: ASSETS.iconTimesheet,
        title: STRINGS.menuBtnTitleI,
      },
      {
        navigate: () => navigation.navigate(STRINGS.pathLoanLedger as never),
        badge: state.loanCount != 0 && badge(state.loanCount),
        image: ASSETS.iconLoanLedger,
        title: STRINGS.menuBtnTitleII,
      },
      {
        navigate: () => navigation.navigate(STRINGS.pathReviewals as never),
        image: ASSETS.iconPending,
        title: STRINGS.menuBtnTitleIII,
        disabled: !reviewer,
      },
    ],
    secondRow: [
      {
        navigate: () => navigation.navigate(STRINGS.pathApprovals as never),
        image: onShowImage(ASSETS.iconCOSRequest, ASSETS.iconApprovals),
        title: onShowTitle(STRINGS.menuBtnTitleUserI, STRINGS.menuBtnTitleApproverI),
        disabled: !approver,
      },
      {
        navigate: () => {
          if (state.teamMembersCount! > 0) {
            true && (navigation as any).navigate('TeamMembers', { screen: 'TeamsList' });
          } else {
            false && (navigation as any).navigate('TeamMembers', { screen: 'TeamsList' });
          }
        },
        image: onShowImage(ASSETS.iconOBRequest, ASSETS.iconTeams),
        title: onShowTitle(STRINGS.menuBtnTitleUserII, STRINGS.menuBtnTitleApproverII),
        //disabled: state.teamMembersCount! <= 0
        disabled: true,
      },
      {
        navigate: () => (navigation as any).navigate('Contacts', { screen: 'ContactsList' }),
        image: onShowImage(ASSETS.iconOTRequest, ASSETS.iconContacts),
        title: onShowTitle(STRINGS.menuBtnTitleUserIII, STRINGS.menuBtnTitleApproverIII),
        disabled: true,
      },
    ],
  };

  const commonProps = {
    placeholderContent: Utils.placeholderLoading(currState),
    style: { width: currState.imageSize, height: currState.imageSize },
  };

  const DisplayButton = ({ item }: { item: TypeObjectValues }) => {
    return (
      <View style={styles.buttonContainer}>
        <Shadow offset={[1, 1.5]} distance={2.5}>
          <TouchableOpacity
            style={[styles.gridButton, { padding: currState.padding, opacity: item.disabled ? 0.6 : 1 }]}
            onPress={item.navigate}
            disabled={item.disabled || false}
          >
            {item.badge && item.badge}
            <Image source={item.image} key={item.title} {...commonProps} />
          </TouchableOpacity>
        </Shadow>

        <Text style={styles.textButton}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {currState.firstRow.map((item: TypeObjectValues, index: number) => (
          <React.Fragment key={index}>{DisplayButton({ item })}</React.Fragment>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        {currState.secondRow.map((item: TypeObjectValues, index: number) => (
          <React.Fragment key={index}>{DisplayButton({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default MenuButton;
