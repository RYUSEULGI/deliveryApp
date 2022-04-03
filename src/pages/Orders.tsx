import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {IOrder} from '../apis/order/order.types';
import OrderList from '../components/order/OrderList';
import {RootState} from '../store/reducer';

const Orders = () => {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = useCallback(({item}: {item: IOrder}) => {
    return <OrderList item={item} />;
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderItem}
    />
  );
};

export default Orders;
