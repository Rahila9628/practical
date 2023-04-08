import { useContext } from 'react';
import { Linking } from 'react-native';
import {
  check,
  AndroidPermission,
  RESULTS,
  request,
  PERMISSIONS,
  IOSPermission,
  PermissionStatus,
} from 'react-native-permissions';
import { isIOS } from '@Utils/Constant';

export const checkForPermission = async (
  permissionOf: AndroidPermission | IOSPermission,
) => {
  const response = await check(permissionOf);
  switch (response) {
    case RESULTS.UNAVAILABLE:
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
    case RESULTS.BLOCKED:
      return response;
    case RESULTS.DENIED:
      return requestForPermission(permissionOf);
  }
};

export const requestForPermission = async (
  permissionOf: AndroidPermission | IOSPermission,
) => {
  await request(permissionOf);
};

export const getBooleanForPermission = (permissionStatus: PermissionStatus) => {
  if (isIOS) {
    if (
      permissionStatus === RESULTS.GRANTED ||
      permissionStatus === RESULTS.LIMITED
    ) {
      return true;
    }
  } else {
    if (permissionStatus === RESULTS.GRANTED) {
      return true;
    }
  }

  return false;
};

export const getStorageOrLibraryPermission = async () => {
  let permission: PermissionStatus | any;
  if (!isIOS) {
    permission = await checkForPermission(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }
  console.log({ permission });

  return getBooleanForPermission(permission);
};

export const getCameraPermission = async () => {
  let permission: PermissionStatus | any;
  if (!isIOS) {
    permission = await checkForPermission(PERMISSIONS.ANDROID.CAMERA);
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.CAMERA);
  }
  return getBooleanForPermission(permission);
};

