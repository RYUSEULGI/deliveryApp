import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';

export const APISignUp = async (parameter: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${Config.API_URL}/user`, parameter);
    return res.data;
  } catch (error) {
    console.error((error as AxiosError).response);
    Alert.alert('알림', error.response.data.message);
  }
};
