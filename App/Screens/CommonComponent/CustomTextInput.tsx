/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputFocusEventData,
  Pressable,
  ViewStyle,
} from 'react-native';
import { CustomText, AssetImage } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import { fontSizes } from '@Utils/Constant';
import CommonStyle from '@Theme/CommonStyle';
import { getSize } from '@Utils/Helper';

interface CustomTextInputProps {
  viewStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  onTextChange: (text: string) => void;
  error?: string;
  value?: string | undefined;
  placeholder?: string;
  isSecure?: boolean;
  label?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
  hideLabel?: boolean;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  maxChar?: number;
  maxLength?: number;
  editable?: boolean;
  rightIcon?: string | null;
  onRightPress?: Function;
  labelViewStyles?: StyleProp<ViewStyle>;
  labelFlex?: number;
  autoCapitalize?: any;
  ref?: any;
  labelLines?: number;
}

const CustomTextInput = ({
  viewStyle,
  containerStyle,
  onTextChange,
  error,
  value,
  placeholder,
  isSecure = false,
  label,
  keyboardType,
  multiline,
  hideLabel = false,
  onSubmitEditing,
  onFocus,
  maxChar = 0,
  maxLength = undefined,
  editable = true,
  rightIcon,
  onRightPress,
  labelViewStyles,
  labelFlex,
  autoCapitalize,
  ref,
  labelLines,
  ...props
}: CustomTextInputProps) => {
  const { appTheme } = useContext(AppContext);
  const [textValue, setTextValue] = useState(value);
  const [isShowPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (value !== textValue) {
      setTextValue(value);
    }
  }, [value]);

  const onShowPassword = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <View style={[{ marginBottom: 5 }, viewStyle]}>
      <View
        style={[
          style.container,
          {
            backgroundColor: 'white' as any,
            alignItems: (multiline && 'flex-start') || 'center',
            paddingTop: (multiline && 10) || 0,
            borderWidth: 1,
            borderColor: 'gray',
            height: (multiline && 100) || 50,
          },
          containerStyle,
        ]}>
        {!hideLabel && label && (
          <View
            style={[
              { flex: (labelFlex && labelFlex) || 0.35 },
              labelViewStyles,
            ]}>
            <CustomText
              numberOfLines={labelLines || 2}
              medium
              style={[{ color: 'gray' }]}>
              {label}
            </CustomText>
          </View>
        )}

        <View style={[CommonStyle.flex1]}>
          <TextInput
            ref={ref}
            {...props}
            style={[
              {
                color: appTheme.text,
                height: (multiline && 100) || 50,
                textAlignVertical: (multiline && 'top') || 'center',
              },
              style.textInputContainer,
            ]}
            multiline={multiline}
            numberOfLines={5}
            placeholder={(placeholder && placeholder) || ''}
            editable={editable}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize || 'none'}
            secureTextEntry={isSecure && isShowPassword}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor={appTheme.textBorder}
            onChangeText={text => {
              setTextValue(text);
              onTextChange(text);
            }}
            underlineColorAndroid={undefined}
            value={textValue}
            onFocus={onFocus}
          />
        </View>
        {isSecure && (
          <TouchableOpacity onPress={onShowPassword} activeOpacity={1}>
            <View
              style={{
                borderBottomColor: appTheme.text,
              }}>
              <AssetImage
                resizeMode={'contain'}
                source={
                  (isShowPassword && AppImages.passwordOpen) ||
                  AppImages.passwordClosed
                }
                imageStyle={[style.inputImg, { tintColor: 'black' }]}
              />
            </View>
          </TouchableOpacity>
        )}

        {rightIcon && (
          <Pressable onPress={(onRightPress && onRightPress()) || null}>
            <View
              style={{
                borderBottomColor: appTheme.text,
              }}>
              <AssetImage
                resizeMode={'contain'}
                source={rightIcon}
                imageStyle={[getSize(15)]}
              />
            </View>
          </Pressable>
        )}

        {rightIcon === null && <View style={style.inputImg} />}
      </View>
      {(error && (
        <CustomText
          medium
          style={{ color: 'red', margin: 5 }}>{`${error}`}</CustomText>
      )) ||
        null}
      {(maxChar && (
        <CustomText
          medium
          style={{
            color:
              ((textValue?.length || 0) > maxChar && appTheme.red) ||
              appTheme.textBorder,
            margin: 5,
          }}>{`${textValue?.length || 0}/${maxChar} character.`}</CustomText>
      )) ||
        null}
    </View>
  );
};

const style = StyleSheet.create({
  textInputContainer: {
    fontSize: fontSizes.medium,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputImg: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export { CustomTextInput };
