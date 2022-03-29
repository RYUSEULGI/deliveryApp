import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {APISignUp} from '../apis/user/user';
import DismisskeyboardView from '../components/DismisskeyboardView';
import {emailCheck, passwordCheck} from '../utils/regex';

const SignUp = () => {
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const handleChangeName = useCallback(text => {
    setName(text.trim());
  }, []);

  const handleChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const handleSubmit = useCallback(async () => {
    if (loading) {
      return;
    }

    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }

    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요');
    }

    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }

    if (!emailCheck(email)) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }

    if (!passwordCheck(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }

    setLoading(true);

    const isSuccess = await APISignUp({email, name, password});

    if (!isSuccess) {
      return;
    }

    setLoading(false);

    Alert.alert('성공', '회원가입 되었습니다.');
  }, [loading, email, name, password]);

  const isSignin = email && name && password;

  return (
    <DismisskeyboardView>
      <View style={styles.inputWrapper}>
        <View>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            ref={emailRef}
            textContentType="emailAddress"
            value={email}
            onSubmitEditing={() => {
              nameRef.current?.focus();
            }}
            blurOnSubmit={false}
            onChangeText={handleChangeEmail}
            placeholder="이메일을 입력해주세요"
            clearButtonMode="while-editing"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>이름</Text>
          <TextInput
            ref={nameRef}
            value={name}
            onChangeText={handleChangeName}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false}
            placeholder="이름을 입력해주세요"
            clearButtonMode="while-editing"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            ref={passwordRef}
            value={password}
            onSubmitEditing={handleSubmit}
            onChangeText={handleChangePassword}
            secureTextEntry
            clearButtonMode="while-editing"
            placeholder="비밀번호를 입력해주세요 (영문,숫자,특수문자 포함)"
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonBox}>
          <Pressable
            onPress={handleSubmit}
            disabled={!isSignin || loading}
            style={
              !isSignin
                ? styles.loginButton
                : StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
            }>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>회원가입</Text>
            )}
          </Pressable>
        </View>
      </View>
    </DismisskeyboardView>
  );
};

export default SignUp;

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
