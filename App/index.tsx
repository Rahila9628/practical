import React from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from '@Routes';
import { store, persistor } from '@Stores';
import { ApiConfig } from '@ApiConfig';
import { removeStoreItem } from '@Utils/Storage';
import { configureUrl, getHeaders } from '@Utils/Helper';
import { AppContextProvider } from '@AppContext';
import CommonStyle from '@Theme/CommonStyle';
import { Authentication } from '@Utils/Enums';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = await getHeaders();
    request.url = configureUrl(config.url!);
    return request;
  },
  error => error,
);

axios.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 401) {
      handleInvalidToken();
    }
    throw error;
  },
);

const handleInvalidToken = async () => {
  await removeStoreItem(Authentication.TOKEN);
  ApiConfig.token = null as any;
  DeviceEventEmitter.emit(Authentication.REDIRECT_LOGIN);
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <View style={CommonStyle.flexContainer}>
            <Routes />
          </View>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
