import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
  Image,
  Pressable,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { CustomText } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { BottomModalContainer } from '@CommonComponent/index';
import {
  getCameraPermission,
  getStorageOrLibraryPermission,
} from '@Utils/Permissions';
import ImagePickerService, { MediaType } from '@Services/ImagePickerService';

interface ImagePickerModelProps {
  show: boolean;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  onRemove?: (event: GestureResponderEvent) => void;
  pickFromCamera?: Function;
  pickFromGallery?: Function;
  onClose?: (() => void) | undefined;
  mediaType?: MediaType | string[] | undefined;
  camera?: boolean;
  gallery?: boolean;
  cropperCircleOverlay?: boolean;
  document?: boolean;
}

const ImagePickerModel = (props: ImagePickerModelProps) => {
  const { appTheme, translations } = useContext(AppContext);

  const {
    onClose = () => {},
    pickFromCamera = () => {},
    pickFromGallery = () => {},
    cropperCircleOverlay = false,
  } = props;

  const renderPickerOption = (
    icon: string,
    title: string,
    onPress: Function,
  ) => {
    return (
      <View style={styles.optionItem}>
        <Pressable
          onPress={() => onPress()}
          android_ripple={CommonStyle.androidRipple}>
          <Image
            resizeMode={'contain'}
            source={{ uri: icon }}
            style={styles.img}
          />
        </Pressable>
        <CustomText
          style={{
            color: appTheme.text,
          }}>
          {title}
        </CustomText>
      </View>
    );
  };

  const getImagePicker = () => (
    <View style={styles.optionContainer}>
      {((props.camera || pickFromCamera) &&
        renderPickerOption(AppImages.icPickCamera, 'Camera', async () => {
          const cameraPermission = await getCameraPermission();
          const hasStoragePermission = await getStorageOrLibraryPermission();

          if (cameraPermission && hasStoragePermission) {
            ImagePickerService.pickFromCamera(
              pickFromCamera,
              (typeof props.mediaType !== 'object' && props.mediaType) ||
                undefined,
              cropperCircleOverlay,
            );
          } else {
            onClose();
            SimpleToast.show(renderMsg(cameraPermission, hasStoragePermission));
          }
        })) ||
        null}
      {((props.gallery || (pickFromGallery && !props.document)) &&
        renderPickerOption(AppImages.icPickGallery, 'Gallery', async () => {
          const hasPermission = await getStorageOrLibraryPermission();
          console.log({ hasPermission });

          if (hasPermission) {
            ImagePickerService.pickFromGallery(
              pickFromGallery,
              (typeof props.mediaType !== 'object' && props.mediaType) ||
                undefined,
              cropperCircleOverlay,
            );
            return true;
          } else {
            onClose();
            SimpleToast.show('Please grant storage permissio');
          }
        })) ||
        null}
      {(props.onRemove &&
        renderPickerOption(
          AppImages.icRemoveImage,
          'Remove',
          props.onRemove,
        )) ||
        null}
    </View>
  );

  const renderMsg = (camera: any, storage: any) => {
    if (!camera && !storage) {
      return 'Please grant camera and storage permission';
    } else if (!camera && storage) {
      return 'Please grant camera permission';
    } else if (camera && !storage) {
      return 'Please grant storage permission';
    }
    return '';
  };

  return (
    <BottomModalContainer
      onClose={() => onClose()}
      show={props.show}
      title={props.title!}
      titleStyle={props.titleStyle!}>
      {getImagePicker()}
    </BottomModalContainer>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    fontSize: 20,
    margin: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  optionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  img: { height: 70, width: 70, margin: 10 },
});

export { ImagePickerModel };
