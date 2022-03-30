import React from 'react';
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismisskeyboardView: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView {...props} style={props.style}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DismisskeyboardView;
