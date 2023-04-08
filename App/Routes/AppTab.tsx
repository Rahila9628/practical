import React, { useContext } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import ThemeColor from '@Theme/Colors';
import { AssetImage } from '@CommonComponent';
import Settings from '@Components/Settings/Settings';
import ProductListing from '@Components/Products/ProductListing';

const Tab = createBottomTabNavigator();

enum tabs {
  ProductsTab = 'Products',
  UsersTab = 'Users',
  SettingsTab = 'Settings',
}

const TABS = [
  {
    title: tabs.ProductsTab,
    icon: AppImages.home,
    screen: ProductListing,
    name: tabs.ProductsTab,
  },
  {
    title: tabs.SettingsTab,
    icon: AppImages.settings,
    screen: Settings,
    name: tabs.SettingsTab,
  },
];

const AppTab = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: ThemeColor.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: appTheme.background,
      }}>
      {TABS.map(tab => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.screen}
            options={(): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused, size }) => (
                  <AssetImage
                    resizeMode={'contain'}
                    source={tab.icon}
                    imageStyle={{
                      height: size,
                      width: size,
                      tintColor:
                        (focused && appTheme.themeColor) || appTheme.lightText,
                    }}
                  />
                ),
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { AppTab, tabs };
