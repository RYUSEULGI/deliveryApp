import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../apis/user/user.types';

const initialState: IUser = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  money: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
  },
});

export default userSlice;
