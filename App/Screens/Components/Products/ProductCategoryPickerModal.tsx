import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  StyleProp,
  TextStyle,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import { CustomText, CustomTextInput } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import AppImages from '@Theme/AppImages';
import { ProductCategory } from '@Utils/Interfaces';

interface ProductCategoryPickerModalProps {
  show: boolean;
  onSumbit: any;
  onClose: Function;
  value?: ProductCategory;
  dataList: ProductCategory[];
}

const ProductCategoryPickerModal = (props: ProductCategoryPickerModalProps) => {
  const dataList = props.dataList!;
  const { appTheme } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState<ProductCategory>(
    props.value!,
  );
  const { model, modelContainer, titleContainer, title, selectedItem } = styles;

  useEffect(() => {
    if (props.value) {
      setSelectedValue(props.value);
    }
  }, [props.value]);

  const renderDataList = ({ item }: { item: ProductCategory }) => (
    <Pressable
      style={styles.dataListContainer}
      onPress={() => {
        setSelectedValue(item);
        props.onSumbit(item);
      }}>
      <CustomText
        medium
        style={[styles.dataListItem, { color: appTheme.text }]}>
        {item.category_name}
      </CustomText>
    </Pressable>
  );

  return (
    <Modal transparent={true} animationType={'fade'} visible={props.show}>
      <View style={model}>
        <Pressable
          style={styles.close}
          onPress={() => {
            props.onClose();
          }}
        />
        <View
          style={[modelContainer, { backgroundColor: appTheme.background }]}>
          <View style={[titleContainer, { borderColor: appTheme.border }]}>
            <CustomText large style={[title]}>
              {'Select Category'}
            </CustomText>
          </View>
          <FlatList
            style={styles.container}
            data={dataList}
            keyExtractor={item => item.toString()}
            renderItem={renderDataList}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  model: {
    flex: 1,
    backgroundColor: 'rgba(82,82,82,0.3)',
  },
  modelContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    paddingBottom: 25,
    flex: 1,
  },
  container: { marginTop: '5%' },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 15,
  },
  title: {
    fontWeight: '500',
    padding: 10,
  },
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
  },
  chips: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingVertical: 2,
    marginVertical: 4,
    marginRight: 8,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
  },
  close: { flex: 0.07 },
  doneBtn: {
    // right: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 5,
    justifyContent: 'center',
  },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tagsText: {
    marginRight: 5,
  },
  dataListContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataListItem: { margin: 5, flex: 1 },
  selectedItem: { height: 20, width: 20, marginRight: 5 },
});

export { ProductCategoryPickerModal };
