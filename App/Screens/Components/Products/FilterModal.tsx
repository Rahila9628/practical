/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import { CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { BottomModalContainer } from '@CommonComponent/BottomModalContainer';
import { useAppSelector } from '@Stores/index';
import { FilterType } from '@Utils/Enums';

interface CustomProps {
  showFilters: boolean;
  onPress: Function;
  onClose: Function;
}

const list = [
  {
    label: 'Assending (A->Z)',
    value: FilterType.ASSENDING,
  },
  {
    label: 'Desending (Z->A)',
    value: FilterType.DESENDING,
  },
  {
    label: 'Category',
    value: FilterType.CATEGORY,
  },
  {
    label: 'Clear',
    value: FilterType.CLEAR,
  },
];

const FilterModal = (props: CustomProps): JSX.Element | null => {
  const { appTheme } = useContext(AppContext);
  const [selectedFilter, setSelectedFilter] = useState<any>();

  const onApply = () => {
    props.onPress(selectedFilter);
  };

  const filterRow = () =>
    list.map(filter => (
      <Pressable
        key={filter.label}
        onPress={() => {
          // setSelectedFilterId(filter.id)

          setSelectedFilter(filter.value);
          props.onPress(filter);
        }}
        style={[styles.row]}>
        <View style={styles.label}>
          <CustomText xlarge>{filter.label}</CustomText>
        </View>
      </Pressable>
    ));

  if (!props.showFilters) {
    return null;
  }

  return (
    <BottomModalContainer
      onClose={() => props.onClose()}
      show={props.showFilters}
      title={'Search Filter'}
      secondaryBtn={{
        title: 'Apply',
        onPress: onApply,
        isLoading: false,
      }}>
      <View style={[styles.filterContainer]}>{filterRow()}</View>
    </BottomModalContainer>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 15,
    height: 60,
  },
  label: { flex: 0.8, justifyContent: 'center' },
  tickContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tickImageContainer: { height: 15, width: 23.4 },
  filterContainer1: { width: '100%' },
  thumb: {
    width: 8 * 2,
    height: 8 * 2,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
  },
  rail: {
    flex: 1,
    height: 1,
    borderRadius: 1,
  },
  railSelected: {
    height: 1,
    borderRadius: 1,
  },
  lableView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  lableView2: {
    minWidth: 80,
    borderRadius: 5,
  },
  sliderLabel: {
    textAlign: 'center',
    padding: 5,
  },
  priceRangeText: { paddingHorizontal: 12, fontSize: 18 },
  priceStart: { marginRight: 5, fontSize: 16 },
  priceEnd: {
    marginLeft: 5,
    fontSize: 16,
  },
});
export default FilterModal;
