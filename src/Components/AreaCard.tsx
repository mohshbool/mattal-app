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
    <View style={styles.border}>
      <TouchableOpacity
        onPress={() => {
          dispatch(updateSelectedArea(label));
          goBack();
        }}>
        <View style={styles.container}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    width: '47%',
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  container: {
    paddingVertical: 25,
    borderBottomColor: Colors.primary,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.l,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default AreaCard;
