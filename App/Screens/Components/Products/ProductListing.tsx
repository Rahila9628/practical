import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomText, Layout, TouchableText } from '@CommonComponent';
import { useAppDispatch, useAppSelector } from '@Stores/index';
import { getProductList } from '@Actions/ProductActions';
import { ProductData } from '@Utils/Interfaces';
import { ProductItemContainer } from '@Components/Products/ProductItemContainer';
import CommonStyle from '@Theme/CommonStyle';
import { getSize, navigateToNextScreen } from '@Utils/Helper';
import { Route } from '@Routes/AppRoutes';
import FilterModal from './FilterModal';
import { FilterType } from '@Utils/Enums';

const ProductListing = () => {
  const { user } = useAppSelector(state => state.user);
  const { products } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedFilter, setSelectedFilter] = useState<any>();
  const [shoFilter, setShowFilter] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<ProductData[] | null>(
    [],
  );

  // methods
  useEffect(() => {
    if (isFocused) {
      dispatch(getProductList());
    }
  }, [isFocused]);

  useEffect(() => {
    let prod: ProductData[] = [...products];
    if (selectedFilter?.value == FilterType.ASSENDING) {
      prod.sort((a, b) => a.product_name.localeCompare(b.product_name));
      setFilteredProduct(prod);
    } else if (selectedFilter?.value == FilterType.DESENDING) {
      prod
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
        .reverse();
      setFilteredProduct(prod);
    } else if (selectedFilter?.value == FilterType.CATEGORY) {
      prod.sort((a, b) => a.category_id.localeCompare(b.category_id));
      setFilteredProduct(prod);
    } else {
      setFilteredProduct(null);
    }
  }, [selectedFilter]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductData;
    index: number;
  }) => {
    return (
      <ProductItemContainer item={item} index={index} onPress={() => {}} />
    );
  };

  const itemSeparator = () => {
    return <View style={[getSize(15)]} />;
  };

  const listFooterComponent = () => {
    return <View style={[getSize(40)]} />;
  };

  return (
    <Layout
      title={`Welcome ${user.username}`}
      scrollContainerStyles={{ paddingHorizontal: 20 }}>
      <View style={[styles.header]}>
        <CustomText large style={[CommonStyle.boldFont]}>
          Products
        </CustomText>

        <TouchableText
          onPress={() =>
            navigateToNextScreen(navigation, { name: Route.AddProductScreen })
          }
          text={'Add product'}
        />
      </View>

      <View style={[styles.header]}>
        <CustomText large style={[CommonStyle.boldFont]}>
          Filter
        </CustomText>

        <TouchableText
          onPress={() => setShowFilter(!shoFilter)}
          text={selectedFilter?.label || 'Filter Option'}
        />
      </View>

      <FlatList
        data={filteredProduct || products}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContainer]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={listFooterComponent}
      />

      <FilterModal
        onClose={() => {
          setShowFilter(false);
        }}
        onPress={(value: any) => {
          setShowFilter(false);
          setSelectedFilter(value);
        }}
        showFilters={shoFilter}
      />
    </Layout>
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
