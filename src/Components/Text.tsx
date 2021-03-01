import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface TextProps {
  text: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const Text: React.FC<TextProps & TextProps> = ({
  text,
  style,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <RNText style={[styles.text, style]} {...props}>
        {text}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: Colors.primary,
  },
});

export default Text;
