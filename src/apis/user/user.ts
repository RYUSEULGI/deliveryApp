import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from '../../constants/basic';
import {ISignupResponse} from './user.types';
import EncryptedStorage from 'react-native-encrypted-storage';

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

export const APIRefreshToken = async (): Promise<ISignupResponse> => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');

    const res = await axios.post(
      `${API_URL}/refreshToken`,
      {},
      {headers: {authorization: `Bearer ${refreshToken}`}},
    );

    if (res.data) {
      return {
        name: res.data.data.name,
        email: res.data.data.email,
        accessToken: res.data.data.accessToken,
      };
    }

    return {
      name: '',
      email: '',
      accessToken: '',
    };
  } catch (error) {
    if ((error as AxiosError).response?.data.code === 'expired') {
      Alert.alert('알림', '다시 로그인해주세요');
      return {
        name: '',
        email: '',
        accessToken: '',
      };
    }

    return {
      name: '',
      email: '',
      accessToken: '',
    };
  } finally {
    // TO DO : 스플래시 스크린 만들기
  }
};

export const APIShowMetheMoney = async (): Promise<number> => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    const res = await axios.get(`${API_URL}/showmethemoney`, {
      headers: {authorization: `Bearer ${accessToken}`},
    });

    if (res.data) {
      return res.data.data;
    }

    return 0;
  } catch (error) {
    console.error((error as AxiosError).response);
    Alert.alert('알림', error.response.data.message);
    return 0;
  }
};

export const APIIntercepter = () => {
  axios.interceptors.response.use(
    res => {
      return res;
    },
    async err => {
      const {
        config,
        res: {status},
      } = err;

      console.log('status: ', status);
      if (status === 419) {
        console.log('dd');
        if (err.response.data.code === 'expired') {
          const originalRequest = config;
          const {accessToken} = await APIRefreshToken();

          console.log(`interceptor token ${accessToken}`);

          await EncryptedStorage.setItem('accessToken', accessToken);

          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(err);
    },
  );
};
