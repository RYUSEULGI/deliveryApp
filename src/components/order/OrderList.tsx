import {NavigationProp, useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../../AppInner';
import {APIAccept} from '../../apis/order/order';
import {IOrder} from '../../apis/order/order.types';
import orderSlice from '../../slices/order';
import {useAppDispatch} from '../../store';
import {RootState} from '../../store/reducer';

interface Props {
  item: IOrder;
}

const OrderList = ({item}: Props) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [detail, setDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = useCallback(() => {
    setDetail(prev => !prev);
  }, []);

  const handleAccept = useCallback(async () => {
    if (loading) {
      return;
    }

    if (!accessToken) {
      return;
    }

    setLoading(true);

    const isSuccess = await APIAccept(item.orderId);

    if (!isSuccess) {
      return;
    }

    dispatch(orderSlice.actions.acceptOrder(item.orderId));
    Alert.alert('알림', '수락되었습니다.');
    setLoading(false);
    navigation.navigate('Delivery');
  }, [dispatch, loading, navigation, accessToken, item.orderId]);

  const handleReject = useCallback(() => {
    Alert.alert('알림', '정말 거절하시겠습니까?', [
      {
        text: '아니오',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: '예',
        onPress: () => {
          dispatch(orderSlice.actions.rejectOrder(item.orderId));
        },
      },
    ]);
  }, [dispatch, item.orderId]);

  const {start, end} = item;

  return (
    <View style={styles.orderContainer} key={`order-item-${item.orderId}`}>
      <Pressable onPress={handlePress}>
        <Text style={styles.item}>{item.price.toLocaleString()}원</Text>
      </Pressable>
      {detail && (
        <View>
          <NaverMapView
            style={{width: '100%', height: '100%'}}
            zoomControl={false}
            center={{
              zoom: 10,
              tilt: 50,
              latitude: (start.latitude + end.latitude) / 2,
              longitude: (start.longitude + end.longitude) / 2,
            }}>
            <Marker
              coordinate={{
                latitude: start.latitude,
                longitude: start.longitude,
              }}
              pinColor="blue"
            />
            <Path
              coordinates={[
                {latitude: start.latitude, longitude: start.longitude},
                {latitude: end.latitude, longitude: end.longitude},
              ]}
            />
            <Marker
              coordinate={{
                latitude: end.latitude,
                longitude: end.longitude,
              }}
            />
          </NaverMapView>
          <Text>상세보기</Text>
          <View style={styles.buttonWrapper}>
            <Pressable
              disabled={loading}
              onPress={handleAccept}
              style={styles.acceptButton}>
              <Text style={styles.buttonText}>수락하기</Text>
            </Pressable>
            <Pressable onPress={handleReject} style={styles.rejectButton}>
              <Text style={styles.buttonText}>거절하기</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  orderContainer: {
    padding: 10,
  },
  item: {
    backgroundColor: 'gray',
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    padding: 10,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
  },
});
