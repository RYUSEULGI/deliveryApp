import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from '../../constants/basic';
import {ISignupResponse} from './user.types';

export const APISignUp = async (parameter: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    return await axios.post(`${API_URL}/user`, parameter);
  } catch (error) {
    console.error((error as AxiosError).response);
    Alert.alert('알림', error.response.data.message);
  }
};

export const APISignIn = async (parameter: {
  email: string;
  password: string;
}): Promise<ISignupResponse> => {
  try {
    const res = await axios.post(`${API_URL}/login`, parameter);

    if (res.data) {
      return {
        name: res.data.data.name,
        email: res.data.data.email,
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      };
    }

    return {
      name: '',
      email: '',
      accessToken: '',
      refreshToken: '',
    };
  } catch (error) {
    Alert.alert('알림', error.response.data.message);
    return {
      name: '',
      email: '',
      accessToken: '',
      refreshToken: '',
    };
  }
};
