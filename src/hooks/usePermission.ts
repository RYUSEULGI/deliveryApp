import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const usePermission = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          console.log(result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert('알림', '이 앱은 위치 권한 허용이 필요합니다.', [
              {text: '네', onPress: () => Linking.openSettings()},
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(console.error);

      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          console.log(result);
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            throw new Error('카메라 지원 안됨');
          }
        })
        .catch(console.error);
    }

    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          console.log(result);
          if (
            result === RESULTS.LIMITED ||
            result === RESULTS.DENIED ||
            result === RESULTS.GRANTED
          ) {
            Alert.alert('알림', '이 앱은 위치 권한 허용이 필요합니다.', [
              {text: '네', onPress: () => Linking.openSettings()},
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(console.error);

      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          console.log(result);
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            throw new Error('카메라 지원 안됨');
          }
        })
        .catch(console.error);
    }
  }, []);
};
