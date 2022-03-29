import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import DismisskeyboardView from '../components/DismisskeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const handleChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const handleSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }

    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }

    Alert.alert('성공', '로그인되었습니다.');
  }, [email, password]);

  const toSignup = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <DismisskeyboardView>
      <View style={styles.inputWrapper}>
        <View>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            ref={emailRef}
            value={email}
            importantForAutofill="yes"
            textContentType="emailAddress"
            placeholder="이메일을 입력해주세요"
            returnKeyType="next"
            onChangeText={handleChangeEmail}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            ref={passwordRef}
            value={password}
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry
            clearButtonMode="while-editing"
            onChangeText={handleChangePassword}
            onSubmitEditing={handleSubmit}
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonBox}>
          <Pressable
            onPress={handleSubmit}
            style={
              !canGoNext
                ? styles.loginButton
                : StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
            }
            disabled={!canGoNext}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </Pressable>
          <Pressable onPress={toSignup}>
            <Text>회원가입하기</Text>
          </Pressable>
        </View>
      </View>
    </DismisskeyboardView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  buttonBox: {
    alignItems: 'center',
  },
  loginButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
    width: 300,
  },
  loginButtonActive: {
    backgroundColor: '#00c471',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '900',
  },
});
