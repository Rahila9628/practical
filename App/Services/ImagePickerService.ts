import ImagePicker from 'react-native-image-crop-picker';

const pickFromGallery = async (
  onPickImage: Function,
  mediaType?: MediaType,
  cropperCircleOverlay: boolean = true,
) => {
  onPickImage(
    await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.2,
      cropperCircleOverlay: cropperCircleOverlay,
      mediaType,
    }),
  );
};

const pickFromCamera = (
  onPickImage: Function,
  mediaType: MediaType,
  cropperCircleOverlay: boolean = true,
) => {
  ImagePicker.openCamera({
    width: 500,
    height: 500,
    cropping: true,
    compressImageQuality: 0.7,
    cropperCircleOverlay: cropperCircleOverlay,
    mediaType,
  }).then(file => onPickImage(file));
};

const ImagePickerService = {
  pickFromGallery,
  pickFromCamera,
};

export default ImagePickerService;
export type MediaType = 'photo' | 'video' | 'any' | undefined;
