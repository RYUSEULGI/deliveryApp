import {createSlice} from '@reduxjs/toolkit';
import {ISignupResponse} from '../apis/user/user.types';

const initialState: ISignupResponse = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export default userSlice;
