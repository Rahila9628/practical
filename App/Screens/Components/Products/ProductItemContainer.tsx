import React, { useContext } from 'react';
import {
  Pressable,
  Share,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AssetImage, CustomText, NetworkImage } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import { getSize } from '@Utils/Helper';
import { ProductData } from '@Utils/Interfaces';

interface CustomProps {
  item: ProductData;
  index?: number;
  customStyles?: StyleProp<ViewStyle>;
  onPress?: Function;
  infoStyles?: StyleProp<ViewStyle>;
  mainContainer?: StyleProp<ViewStyle>;
}

const ProductItemContainer = (props: CustomProps) => {
  const { appTheme, translations } = useContext(AppContext);
  const { item, customStyles, onPress, infoStyles, mainContainer } = props;

  // Methods
  const renderImage = () => {
    if (item?.product_image) {
      return `${item?.product_image}`;
    }
  };

  return (
    <Pressable
      onPress={() => (onPress && onPress()) || null}
      style={[styles.container, mainContainer]}>
      {/* <View style={[CommonStyle.row, CommonStyle.flex1, customStyles]}> */}
      {(item?.product_image && (
        <NetworkImage
          source={renderImage()}
          imageStyle={styles.productImage}
          resizeMode={'contain'}
        />
      )) || <></>}

      <View style={[styles.infoContainer, infoStyles]}>
        <CustomText large numberOfLines={1}>
          {item?.product_name}
        </CustomText>
        <View style={getSize(5)} />
        <CustomText small numberOfLines={1}>
          {(item?.category_name && item?.category_name) || ''}
        </CustomText>
      </View>
      {/* </View> */}
    </Pressable>
  );
};

export { ProductItemContainer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
