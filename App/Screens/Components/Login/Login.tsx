import React, { useContext, useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import CommonStyle from '@Theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@AppContext';
import { CustomText, CustomTextInput } from '@CommonComponent';
import AppImages from '@Theme/AppImages';
import { ButtonComponent } from '@SubComponents';
import { setItemInStorage } from '@Utils/Storage';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen, isEmpty, isValidEmail } from '@Utils/Helper';
import { Authentication } from '@Utils/Enums';
import { setUserDetail } from '@Actions/UserActions';
import { useAppDispatch } from '@Stores/index';

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 130,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 50,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});

const Login = () => {
  const { appTheme, translations } = useContext(AppContext);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { outer, title, btnText } = styles;
  const { flexContainer, center } = CommonStyle;

  // states
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    username: 'Jyoti',
    name: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);

  const onChangeText = (text: string, type: string) => {
    setIsSubmitDisable(false);
    setLoginData({
      ...loginData,
      [type]: text,
    });
  };

  const onLogin = async () => {
    const isValid = onValidate();

    if (!isValid) {
      setIsSubmitDisable(true);
    }

    if (isValid) {
      setIsProcessing(true);
      try {
        // Make api call and store user in redux and token in Storage
        await setItemInStorage(Authentication.TOKEN, 'set login token');
        dispatch(setUserDetail({ user: loginData, isLoggedIn: true }));
        goToNextScreen(navigation, Route.HomeScreen);
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
      }
    }
  };

  const onValidate = () => {
    const { email, password } = loginData;
    if (!isEmpty(email)) {
      SimpleToast.show(`Please enter your email.`);
      return false;
    }
    if (!isValidEmail(email)) {
      SimpleToast.show('Please enter a valid email address');
      return false;
    }
    if (!isEmpty(password)) {
      SimpleToast.show(`Please enter your password.`);
      return false;
    }

    // sample user details.
    if (email !== 'jyoti@gmail.com' || password !== 'Jyoti@123') {
      SimpleToast.show('Invalid credentials');
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView
      style={[flexContainer, { backgroundColor: appTheme.background }]}>
      <View style={[flexContainer, center]}>
        <View style={outer}>
          <CustomText xxlarge style={[title, { color: appTheme.text }]}>
            {translations.SIGN_IN}
          </CustomText>
          <CustomTextInput
            value={loginData.email}
            onTextChange={(text: string) => onChangeText(text, 'email')}
            placeholder={'Email'}
            rightIcon={
              (isValidEmail(loginData?.email) && AppImages.tick) || null
            }
            keyboardType={'email-address'}
            labelLines={1}
          />

          <CustomTextInput
            value={loginData.password}
            onTextChange={(text: string) => onChangeText(text, 'password')}
            placeholder={'Password'}
            isSecure
            labelLines={1}
          />
          <CustomText style={[btnText, { color: appTheme.lightText }]}>
            Forgot Password?
          </CustomText>
          <ButtonComponent
            title={'Log in'}
            isProcessing={isProcessing}
            onPress={onLogin}
            disabled={isSubmitDisable}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
