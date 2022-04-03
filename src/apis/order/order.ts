import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {API_URL} from '../../constants/basic';
import EncryptedStorage from 'react-native-encrypted-storage';

export const APIAccept = async (orderId: string): Promise<boolean> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  try {
    const res = await axios.post(
      `${API_URL}/accept`,
      {orderId},
      {headers: {authorization: `Bearer ${accessToken}`}},
    );

    console.log(res.data.data);
    if (res.data) {
      return true;
    }
    return false;
  } catch (error) {
    console.error((error as AxiosError).response);
    Alert.alert('알림', error.response.data.message);
    return false;
  }
};
