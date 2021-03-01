import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface AreaCardProps {
  label: string;
}

const AreaCard: React.FC<AreaCardProps> = ({label}) => {
  return (
    <TouchableOpacity onPress={() => console.log(label)}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: Colors.primary,
  },
});

export default AreaCard;
