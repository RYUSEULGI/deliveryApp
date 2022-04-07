import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import Settings from './src/pages/Settings';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import useSocket from './src/hooks/useSocket';
import {APIRefreshToken} from './src/apis/user/user';
import userSlice from './src/slices/user';
import {useAppDispatch} from './src/store';
import orderSlice from './src/slices/order';
import {APIIntercepter} from './src/apis/user/user';
import EncryptedStorage from 'react-native-encrypted-storage';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complate: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const AppInner = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );

  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const dataCallback = (data: any) => {
      dispatch(orderSlice.actions.addOrder(data));
    };

    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', dataCallback);
    }

    return () => {
      if (socket) {
        socket.off('order', dataCallback);
      }
    };
  }, [dispatch, isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  // useEffect(() => {
  //   APIIntercepter();
  // }, []);

  useEffect(() => {
    const getRefreshToken = async () => {
      const {accessToken} = await APIRefreshToken();

      if (!accessToken) {
        return;
      }

      await EncryptedStorage.setItem('accessToken', accessToken);
      dispatch(userSlice.actions.setUser({accessToken}));
    };
    getRefreshToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '주문 목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내정보'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppInner;
