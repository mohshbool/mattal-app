import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
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
});

export default Button;
