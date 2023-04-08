import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  Alert,
  DeviceEventEmitter,
  EmitterSubscription,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext';
import { userLogout } from '@Actions/UserActions';
import { SettingRow } from '@SubComponents';
import { removeStoreItem } from '@Utils/Storage';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen } from '@Utils/Helper';
import { Authentication } from '@Utils/Enums';

const Settings = () => {
  const { appTheme, translations } = useContext(AppContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let isLogout: EmitterSubscription | null = null;

  const logout = () => {
    Alert.alert(
      '',
      'Do you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: onLogout,
        },
      ],
      { cancelable: true },
    );
  };

  const onLogout = async () => {
    goToNextScreen(navigation, Route.LoginScreen);
    dispatch(userLogout());
    await removeStoreItem(Authentication.TOKEN);
  };

  useEffect(() => {
    if (isLogout) {
      isLogout.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLogout = DeviceEventEmitter.addListener(
      Authentication.REDIRECT_LOGIN,
      onLogout,
    );
  }, []);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        { backgroundColor: appTheme.background },
      ]}>
      <SettingRow
        title={translations.LOG_OUT}
        onPress={logout}
        textStyle={{ color: appTheme.red }}
      />
    </SafeAreaView>
  );
};

export default Settings;
