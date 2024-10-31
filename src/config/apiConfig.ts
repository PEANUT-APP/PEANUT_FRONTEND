import {NativeModules, Platform} from 'react-native';
import {API_URL_DEVICE, API_URL_EMULATOR} from '@env';

export const isEmulator = () => {
  if (Platform.OS === 'android') {
    return NativeModules.DevSettings && NativeModules.DevSettings.isEmulator;
  }
  return false;
};

export const finalBaseUrl = isEmulator() ? API_URL_EMULATOR : API_URL_DEVICE;
