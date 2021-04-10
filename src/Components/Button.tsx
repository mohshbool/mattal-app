import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface ButtonProps {
  text: string;
  onPress: () => void;
  outlined?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  outlined,
  containerStyle,
  textStyle,
  disabled,
}) => {
  const dark = useDarkMode();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || false}
      style={[
        styles.container,
        {backgroundColor: dark ? Colors.secondary : Colors.primary},
        outlined ? styles.outlinedContainer : {},
        containerStyle,
      ]}>
      <Text
        style={[
          styles.text,
          {color: dark ? Colors.primary : Colors.secondary},
          outlined ? styles.outlinedText : {},
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 25,
    minWidth: 40,
    paddingVertical: 15,
    paddingHorizontal: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '600',
    paddingHorizontal: 8,
    color: Colors.secondary,
    fontFamily: Fonts.regular,
    letterSpacing: 0.01,
  },
  outlinedContainer: {
    borderWidth: 2.5,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  outlinedText: {
    color: Colors.white,
  },
});

export default Button;
