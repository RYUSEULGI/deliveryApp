import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrder} from '../apis/order/order.types';

interface initialState {
  orders: IOrder[];
  deliveries: IOrder[];
}
const initialState: initialState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<IOrder>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);

      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      const deliveryIndex = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );

      if (index > -1) {
        state.orders.splice(index, 1);
      }

      if (deliveryIndex > -1) {
        state.deliveries.splice(deliveryIndex, 1);
      }
    },
    setDelivery(state, action) {
      state.deliveries = action.payload;
    },
  },
});

export default orderSlice;
