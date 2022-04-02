import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from '../../constants/basic';

export const APISignUp = async (parameter: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    return await axios.post(`${API_URL}/accept`, parameter);
  } catch (error) {
    console.error((error as AxiosError).response);
    Alert.alert('알림', error.response.data.message);
  }
};
