import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  AssetImage,
  CustomText,
  CustomTextInput,
  Layout,
  Loading,
  NetworkImage,
} from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { getSize } from '@Utils/Helper';
import { ImagePickerModel } from '@CommonComponent/ImagePicker';
import { ButtonComponent } from '@SubComponents/index';
import { addProduct, getProductCategories } from '@Services/ProductService';
import SimpleToast from 'react-native-simple-toast';
import { ProductCategory } from '@Utils/Interfaces';
import { ProductCategoryPickerModal } from './ProductCategoryPickerModal';
import { AppContext } from '@AppContext/index';
import { useNavigation } from '@react-navigation/native';

const AddProduct = () => {
  const { appTheme } = useContext(AppContext);
  const navigation = useNavigation();
  // States
  const [imagePickerModal, setImagePickerModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isProcessing, setProcesssing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [productDescription, setProductDescription] = useState('');
  const [productDescriptionError, setProductDescriptionError] = useState('');
  const [productName, setProductName] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [productCategory, setProductCategory] = useState<
    ProductCategory | undefined
  >();
  const [productCategories, setProducCategories] = useState<ProductCategory[]>(
    [],
  );

  // Hooks
  useEffect(() => {
    getCategories();
  }, []);

  // Methods
  const getCategories = async () => {
    try {
      const response = await getProductCategories();
      if (response?.code == 200) {
        setProducCategories(response?.data);
      }
    } catch (e) {
      console.log('error while getting product categories => ', e);
    }
  };

  const onPickImage = async (image: any) => {
    setImageLoading(false);
    console.log({ image });
    if (image) {
      setSelectedImage(image);
    }
    setImagePickerModal(false);
  };

  const isValid = () => {
    let isValid = true;
    if (!productName) {
      setProductNameError('Please enter a product name');
      isValid = false;
    }

    if (!productDescription) {
      setProductDescriptionError('Please enter a product description');
      isValid = false;
    }

    if (!productPrice) {
      setProductPriceError('Please enter a product price');
      isValid = false;
    } else if (Number.parseFloat(productPrice) <= 0) {
      setProductPriceError('Product price must be greater than zero');
    }

    if (!productCategory) {
      SimpleToast.show('Please select category');
      return false;
    }

    if (!selectedImage) {
      SimpleToast.show('Please select product image');
      return false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    try {
      if (!isValid()) {
        return;
      }
      setProcesssing(true);
      const data = new FormData();
      const currentFileName =
        (selectedImage.fileName && selectedImage.fileName) || 'filename.jpg';
      const extension = currentFileName.split('.').pop();
      const fileName = `${Date.now()}.${extension}`;
      data.append('image', {
        uri: selectedImage?.uri || selectedImage?.path,
        type: '*/*',
        name: fileName,
      });
      data.append('category_id', productCategory?.id);
      data.append('product_name', productName);
      data.append('price', productPrice);
      data.append('description', productDescription);
      const response = await addProduct(data);
      console.log('response => ', response);
      if (response?.code == 200) {
        SimpleToast.show(response?.message || 'Product added successfully');
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
      setProcesssing(false);
    } catch (e) {
      console.log('error while add product => ', e);
      setProcesssing(false);
    }
  };

  return (
    <Layout
      scrollable
      scrollContainerStyles={[
        CommonStyle.paddingHorizontal,
        CommonStyle.paddingTop,
      ]}
      title={'Add Product'}
      showBack>
      <Pressable
        style={{ alignSelf: 'center' }}
        onPress={() => setImagePickerModal(!imagePickerModal)}>
        <View style={[getSize(120), styles.imageContainer]}>
          {(selectedImage?.path && (
            <NetworkImage
              source={selectedImage.path}
              imageStyle={[getSize(140), { borderRadius: 30 }]}
              showLoading={isImageLoading}
            />
          )) || <></>}
          {(isImageLoading && <Loading />) || <></>}
        </View>
        {/* )} */}
      </Pressable>

      <View style={[getSize(20)]} />

      <CustomTextInput
        value={productName}
        onTextChange={(text: string) => {
          setProductName(text);
          setProductNameError('');
        }}
        error={productNameError}
        placeholder={'Product Name'}
      />

      <CustomTextInput
        value={productPrice}
        onTextChange={(text: string) => {
          setProductPrice(text);
          setProductPriceError('');
        }}
        placeholder={'Product price'}
        keyboardType="number-pad"
        error={productPriceError}
      />

      <Pressable
        style={[styles.container]}
        android_ripple={CommonStyle.androidRipple}
        onPress={() => setShowCategoryModal(!showCategoryModal)}>
        <CustomText
          numberOfLines={1}
          style={{
            color: (productCategory && appTheme.text) || appTheme.textBorder,
          }}>
          {productCategory?.category_name || 'Select category'}
        </CustomText>
      </Pressable>

      <CustomTextInput
        value={productDescription}
        onTextChange={(text: string) => {
          setProductDescription(text);
          setProductDescriptionError('');
        }}
        placeholder={'Product description'}
        multiline
        error={productDescriptionError}
      />

      <ButtonComponent
        title={'Submit'}
        isProcessing={isProcessing}
        onPress={onSubmit}
        // disabled={isSubmitDisable}
      />

      <ImagePickerModel
        show={imagePickerModal}
        pickFromCamera={onPickImage}
        pickFromGallery={onPickImage}
        onClose={() => {
          setImagePickerModal(false);
        }}
        title={'Select Option'}
      />

      <ProductCategoryPickerModal
        dataList={productCategories}
        onClose={() => {
          setShowCategoryModal(false);
        }}
        onSumbit={(value: ProductCategory) => {
          setProductCategory(value);
          setShowCategoryModal(false);
        }}
        show={showCategoryModal}
      />
    </Layout>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#e3e3e3',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15,
  },
  container: {
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    minHeight: 50,
    justifyContent: 'center',
    marginBottom: 15,
    borderColor: 'gray',
  },
});
