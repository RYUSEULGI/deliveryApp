import axios from 'axios';
import {Alert} from 'react-native';
import {API_URL} from '../../constants/basic';
import EncryptedStorage from 'react-native-encrypted-storage';

export const APIAccept = async (orderId: string): Promise<boolean> => {
  try {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    const res = await axios.post(
      `${API_URL}/accept`,
      {orderId},
      {headers: {authorization: `Bearer ${accessToken}`}},
    );

    if (res.data) {
      return true;
    }
    return false;
  } catch (error) {
    if (error.response.status === 400) {
      Alert.alert('알림', error.response.data.message);
    }

    return false;
  }
};
