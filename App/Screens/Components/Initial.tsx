import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen } from '@Utils/Helper';
import { useAppSelector } from '@Stores/index';

const Initial = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAppSelector(state => state.user);

  useEffect(() => {
    isUserLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUserLogin = async () => {
    if (!isLoggedIn) {
      goToNextScreen(navigation, Route.LoginScreen);
      return;
    }
    goToNextScreen(navigation, Route.HomeScreen);
  };

  return <View />;
};

export default Initial;
