import EncryptedStorage from 'react-native-encrypted-storage';

export const getToken = async () => {
  const token = await EncryptedStorage.getItem('refreshToken');

  if (!token) {
    return;
  }

  return token;
};
