import React, {useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {APIShowMetheMoney} from '../apis/user/user';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {RootState} from '../store/reducer';

const Settings = () => {
  const dispatch = useAppDispatch();

  const money = useSelector((state: RootState) => state.user.money);
  const name = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    getMoney();
  }, [dispatch]);

  const getMoney = async () => {
    await APIShowMetheMoney();
    // dispatch(userSlice.actions.setMoney(price));
  };

  const handleLogout = async () => {
    Alert.alert('알림', '로그아웃 되었습니다.');
    dispatch(userSlice.actions.setUser(''));

    await EncryptedStorage.removeItem('refreshToken');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <Text style={styles.topWrapperText}>{name}님의 수익금</Text>
        <Text style={styles.priceText}>{money.toLocaleString()}원</Text>
      </View>
      <View>
        <Pressable onPress={handleLogout} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  topWrapper: {
    padding: 20,
  },
  topWrapperText: {
    fontSize: 20,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
  },
  loginButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c471',
    borderRadius: 8,
    marginTop: 20,
    width: 300,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '900',
  },
});
