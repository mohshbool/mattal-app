import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface ButtonProps {
  text: string;
  onPress: () => void;
  outlined?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  outlined,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        containerStyle,
        outlined ? styles.outlinedContainer : {},
      ]}>
      <Text
        style={[styles.text, textStyle, outlined ? styles.outlinedText : {}]}>
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
    backgroundColor: Colors.primary,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: Colors.secondary,
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
