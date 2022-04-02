import {createSlice} from '@reduxjs/toolkit';
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
      state.accessToken = action.payload;
    },
    setMoney(state, action) {
      state.money = action.payload;
    },
  },
});

export default userSlice;
