import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#808080"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  input: {
    width: '100%',
    fontSize: Fonts.lg,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 6,
    color: Colors.primary,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
});

export default Input;
