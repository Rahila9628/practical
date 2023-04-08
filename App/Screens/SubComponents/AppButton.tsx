import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent';
import { AppContext } from '@AppContext';

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    ...CommonStyle.center,
    marginVertical: 5,
    minWidth: 100,
  },
  gradientBtn: {
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 25,
    minWidth: 160,
    ...CommonStyle.center,
  },
  alignSelf: {
    alignSelf: 'center',
  },
  pressableContainer: {
    overflow: 'hidden',
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

interface ButtonComponentProps {
  title: string | JSX.Element;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  border?: string;
  backColor?: string;
  textColor?: string;
  isProcessing?: boolean;
  icon?: string;
  borderRadius?: number;
  numberOfLines?: number;
  disabled?: boolean;
}
const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    title,
    onPress,
    style,
    border,
    backColor,
    textColor,
    isProcessing,
    borderRadius = 10,
    numberOfLines,
    disabled = false,
  } = props;
  const { outer } = styles;
  const { appTheme } = useContext(AppContext);
  return (
    <View style={styles.pressableContainer}>
      <Pressable
        onPress={() => onPress!()}
        disabled={isProcessing || disabled}
        android_ripple={CommonStyle.androidRipple}
        style={[
          outer,
          {
            backgroundColor: backColor || appTheme.themeColor,
            borderColor: border || appTheme.border,
            borderRadius: borderRadius,
            opacity: (disabled && 0.7) || 1,
          },
          CommonStyle.overFlowHidden,
          style,
        ]}>
        {(!isProcessing && (
          <CustomText
            large
            numberOfLines={numberOfLines}
            style={{ color: textColor || appTheme.tint }}>
            {title}
          </CustomText>
        )) || <ActivityIndicator color={textColor || appTheme.tint} />}
      </Pressable>
    </View>
  );
};

export { ButtonComponent };
