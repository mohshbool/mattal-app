import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateSelectedArea} from '../Action';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

interface AreaCardProps {
  label: string;
}

const AreaCard: React.FC<AreaCardProps> = ({label}) => {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(updateSelectedArea(label));
        goBack();
      }}>
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
